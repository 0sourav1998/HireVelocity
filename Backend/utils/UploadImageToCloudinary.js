const cloudinary = require('cloudinary').v2;


exports.uploadImageToCloudinary = async (file, folder) => {
    const options = {
        folder: folder,
        resource_type: "auto",
    };
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message);
        throw error;
    }
};
