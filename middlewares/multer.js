const multer  = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: process.env.CLOUD_AUDIO_DIARY_FOLDER,
        resource_type: "auto",
        // format: async (req, file) => mp3,
        public_id: (req, file) =>  `${Date.now()}-${file.originalname}`,
    },
});

const upload = multer({storage});

module.exports = upload;