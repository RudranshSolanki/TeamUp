import mongoose from "mongoose";

export const ConnectToDb =async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log('connected db')
    }
    catch(err){
        console.log('something went wrong while connecting to DB');
        console.log(err);
    }
}