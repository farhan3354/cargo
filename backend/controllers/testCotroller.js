import Testmodel from "../models/testModel.js";

export const savetheResponse= async(req,res)=>{
    try{
        const{name,email,phone,education}=req.body;
        if(!name||!email||!phone||!education){
            return res.status(400).json({success:false,message:"all fields are required"})
        }
        
        const savedData = await Testmodel.create({name,email,phone,education})
        return res.status(200).json({success:true,message:"data saved successfully",data:savedData})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}

export const getDetails=async(req,res)=>{
    try {
       const details =await Testmodel.find();
       if(!details){
        return res.status(400).json({success:false,message:"No details found"})
       }
       return res.status(200).json({success:true,message:"details fetched successfully",data:details})
    } catch (error) {
       return res.status(500).json({success:false,message:error.message})
    }
}

export const getbyId =async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(400).json({success:false,message:"ID is required"})
        }
        const details =await Testmodel.findById(id);
        if(!details){
            return res.status(400).json({success:false,message:"No details found"})
        }
        return res.status(200).json({success:true,message:"details fetched successfully",data:details})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

export const update = async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(400).json({success:false,message:"ID is required"})
        }
        const details =await Testmodel.findById(id);
        if(!details){
            return res.status(400).json({success:false,message:"No details found"})
        }
        const updatedDetails =await Testmodel.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json({success:true,message:"details updated successfully",data:updatedDetails})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

export const deleteById = async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(400).json({success:false,message:"ID is required"})
        }
        const details =await Testmodel.findById(id);
        if(!details){
            return res.status(400).json({success:false,message:"No details found"})
        }
        const deletedDetails =await Testmodel.findByIdAndDelete(id)
        return res.status(200).json({success:true,message:"details deleted successfully",data:deletedDetails})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}