import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
    email:{type:String,required:true,unique:true,index:true,validate: {
        validator: function (v) {
          return /^[\w.%+-]+@dumadu\.com$/.test(v);
        },
        message: props => `${props.value} is not a valid email!, Only Company Mail is required`
      }},
    name:{type:String,required:true},
    password:{type:String,required:true},
    dob:{type:Date,default:Date.now()},
    gender:{type:String,enum:['Male','Female','Others'],required:true},
    loginDay:{type:Date,default:null},
    logoutDay:{type:Date,default:null},
    previousTimeHour:[],
    projects:[],
    role:{type:String,enum:['Admin','Employee'],default:'Employee'}
})