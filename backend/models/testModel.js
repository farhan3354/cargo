import mongoose from "mongoose";

const TestSchema = mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,required:true} ,
    message:{type:String,required:true},
    education:{type:[String],required:true,validate:value=>value.length>0}    
},
{timestamps:true}
) 

const Testmodel = mongoose.model("TestData",TestSchema);
export default Testmodel; 