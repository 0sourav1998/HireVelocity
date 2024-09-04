const cloudinary = require("cloudinary").v2

exports.uploadImageToCloudinary = async(file,folder,height,quality)=>{
    const options = {
        folder : folder ,
        resource_type: "auto",
    }
    if(height){
        options.height = height
    }
    if(quality){
        options.quality = quality
    }
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,options)
        return result ;
    } catch (error) {
        console.error("Something Went Wrong while uploading image to Cloudinary",error.message)
    }
}