import bcrypt from 'bcrypt'
import { UserRepo } from './user.repo.js';
import jwt from 'jsonwebtoken'
export class UserController{
    constructor(){
        this.userRepo = new UserRepo();
    }
    async registerUser(req,res){
        try{
            const{name,email,password,gender} = req.body;
            //check email doesn't exist already
            const user = await this.userRepo.findUser(email);
            if(user)
                throw new Error('User Already Exist');
            //hash password
            const hashPassword = await bcrypt.hash(password,12);
            // send data to repository to add register the user
            let result = await this.userRepo.registerUser({name,email,password:hashPassword,gender}); //here repo function will be present 
            if(!(result instanceof Error))
                res.status(201).send('User added success');
            else{
                throw new Error(result);
            }
        }
        catch(err){
            console.log(err);
            res.status(400).send('something went wrong and error is '+err)
        }
    }
    async loginUser(req,res){
        try{
            const {email,password} = req.body;
            // first find user 
            const user = await this.userRepo.findUser(email);
            if(!user)
                throw new Error('User does not exist');
            //check user and password here 
            const result = await this.userRepo.logingUser(email,password);
            if(!result)
                throw new Error('Password does not match');
            else{
                const token  = jwt.sign({userEmail:email,userRole:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
                res.status(200).cookie("jwtToken",token,{maxAge:900000,httpOnly:true}).send('User loggedIn');
            }
            //success then show cred page
            //if already logged in today then delete logouttime value
            //else throw an error
        }
        catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    }
    async getUserDetails(req,res){
        try{
            //simple fetching data from db
        }
        catch(err){

        }
    }

    async logoutUser(req,res){
        try{
            //destroy user and remove token from browser cookie
            // calculate total time 
        }
        catch(err){

        }
    }

    async previousDayWorkHour(req,res){
        try{
            // get array of previousTimeHour in db
        }
        catch(err){

        }
    }

    async getUserProject(req,res){
        try{
            //get user project form projects array in db 
        }
        catch(err){

        }
    }

    async deleteAccout(req,res){
        try{
            //admin can deleteAccount
        }
        catch(err){

        }
    }

    async assignProject(req,res){
        try{
            //admin can assign project to employee
        }
        catch(err){

        }
    }

    async unassignProject(req,res){
        try{
            //remove project from employee
        }
        catch(err){

        }
    }

    async createAdmin(req,res){
        try{
            // promote employee to admin
        }
        catch(err){

        }
    }

    async listAllUsers(req,res){
        try{
            //admin can get list of all employee
        }
        catch(err){

        }
    }
    async getUser(req,res){
        try{
            //admin can get detail of any user
        }
        catch(err){

        }
    }
}