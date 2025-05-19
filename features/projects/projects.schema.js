import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String},
    contributors:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}]
})

export default projectSchema;