const Company = require("../models/CompanyModel")

exports.registerCompany = async(req,res)=>{
    try {
        const {name} = req.body ;
        if(!name){
            return res.status(400).json({
                success : false ,
                message : "This Field is required"
            })
        }
        let company = await Company.findOne({name : name});
        if(company){
            return res.status(400).json({
                success : false ,
                message : "Upu Cannot Create Same Company"
            })
        }
        const createdCompany = await Company.create({
            name : name ,
            userId : req.userId
        });
        return res.status(201).json({
            success : true ,
            message : "Company Created Successfully" ,
            createdCompany
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Registering the Company"
        })
    }
}

exports.getComapanies = async(req,res)=>{
    try {
        const userId = req.userId ;
        const companies = await Company.find({userId : userId});
        if(!companies){
            return res.status(404).json({
                success : false ,
                message : "Companies Not Found"
            })
        }
        return res.status(200).json({
            success : true ,
            message : "Companies Fetched Successfully",
            companies
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Finding Companies"
        })
    }
}

exports.getCompanyById = async(req,res)=>{
    try {
        const companyId = req.params.id ;
        if(!companyId){
            return res.status(400).json({
                success : false ,
                message : "This Field is Required"
            })
        }
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                success : false ,
                message : "Company Not Found"
            })
        }
        return res.status(200).json({
            success : true ,
            message  : "Company Fetched Successfully",
            company,
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Finding The Company"
        })
    }
}

exports.updateCompany = async(req,res)=>{
    try {
        const companyId = req.params.id ;
        const {name , description , location , website} = req.body;
        // const file = req.files.file ;
        const companyUpdate = {name , description , location , website}
        const company = await Company.findByIdAndUpdate(companyId,companyUpdate,{new : true});
        if(!company){
            return res.status(404).json({
                success : false ,
                message : "Company Not Found"
            })
        }
        return res.status(200).json({
            success : true ,
            message : "Company Details Updated Successfully",
            company
        })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Updating Company Details"
        })
    }
}