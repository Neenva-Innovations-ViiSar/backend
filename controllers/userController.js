const User = require("../models/User");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const jwt = require("jsonwebtoken");

let otpStore = {};

async function handleLogin(req, res) { //login phonenumber and OTP send
  try {
    const { phonenumber } = req.body;

    if (!phonenumber) {
      return res.status(400).json({ message: "Phone number required" });
    }

    const OTP = Math.floor(1000 + Math.random() * 9000);
    const expiry = Date.now() + 2 * 60 * 1000;

    otpStore[phonenumber] = { otp: OTP, expiresAt: expiry };

    // Send OTP
    await client.messages.create({
      body: `Your OTP verification code is ${OTP}. It will expire in 2 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phonenumber}`,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function verifyLogin(req, res) { // OTP verification and storing phonnumber
  try {
    const { phonenumber, otp } = req.body;

    if (!phonenumber || !otp)
      return res.status(400).json({ message: "Phone & OTP required" });

    const stored = otpStore[phonenumber];

    if (!stored) {
      return res
        .status(400)
        .json({ message: "OTP not found. Please request a new one." });
    }

    if (Date.now() > stored.expiresAt) {// after otp expiry
      delete otpStore[phonenumber];
      return res
        .status(400)
        .json({ message: "OTP expired. Please request a new one." });
    }

    if (parseInt(otp) !== stored.otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    delete otpStore[phonenumber]; // Clear used OTP

    let user = await User.findOne({ phonenumber });

    let message;
    if (!user) {
      user = new User({ phonenumber });
      await user.save();
      message = "User is created, you are logged in successfully";
    } else {
      message = "Login successful";
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message,
      data: {
        token,
        user: {
          id: user._id,
          phonenumber: user.phonenumber,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


async function userProfile(req, res) {// only phonenumber
  try {
    const user = await User.findById(req.user.id).select("-__v");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateUserProfile = async (req, res) => { // phonenumber + name + class
  try {
    const { classId, name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { classId, name },
      { new: true }
    ).select("-__v");

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { handleLogin, verifyLogin, userProfile, updateUserProfile };
