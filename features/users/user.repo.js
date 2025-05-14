import mongoose, { model } from "mongoose";
import bcrypt from 'bcrypt'
import { userSchema } from "./user.schema.js";
const userModel = mongoose.model('User',userSchema)
export class UserRepo{


    // register user
    async registerUser(data){
        try{
            const user =await userModel.create(data);
            return true;
        }
        catch(err){
            return err;
        }
    }

    //find user
    async findUser(email){
        const user = await userModel.findOne({email});
        if(user)
            return user;
        return false;
    }

    //login user
    async logingUser(email,password){
        const user = await userModel.findOne({email});
        const hashPass = user.password;
        const result = await bcrypt.compare(password,hashPass)
        return result;
    }

    //get user detail
    async getUserDetail(){

    }

    //logout user
    async logoutUser(){

    }

    // get work hours for previous days
    async previousDayWorkHour(email){
        try{
            const userWorkingHours = await userModel.aggregate([
                {
                    $match:{email:email}
                },
                {
                    $project:{
                        _id:0,
                        previousTimeHour:{$slice:["$previousTimeHour",-5]}
                    }
                }
            ]);
            return userWorkingHours
        }
        catch{

        }
    }

    //get user project
    async getUserProject(userEmail){
        try{
            const projects = await userModel.findOne({email:userEmail},{projects:1,_id:0})
            return projects;
        }
        catch(err){
            throw new Error(err);
        }
    }

    //delete accout manage by admin and current user
    async deleteAccount(){

    }

    //assign project to employee
    async assignProject(){

    }

    //unassing project from employee
    async unassignProject(){

    }

    //create admin only admin can do this
    async createAdmin(){

    }

    //get list of all user only admin can do this
    async listAllUsers(){

    }

    //get single user
    async getUser(){

    }


}