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

                //determining login time of user
                await this.loginTime(user);
                return res.status(200).cookie("jwtToken",token,{maxAge:900000,httpOnly:true}).send('User loggedIn');
            
            }
        }
        catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    }

    async loginTime(user){
        if(user.loginDay ==null)
        {
            user.loginDay = Date.now();
            
        }
        else{
            let loginDate = new Date(user.loginDay).toISOString().split('T')[0];

            let currentDate = new Date().toISOString().split('T')[0];
            if(loginDate != currentDate){
                user.loginDay = Date.now();
                
            }
            
        }
        await user.save();
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
            res.clearCookie('jwtToken',{
                httpOnly:true,
                secure:true,

            })
            //finding so that fetch and store login and logout time calculate total time 
            const user = await this.userRepo.findUser(req.userEmail);
            if(user){
               await this.logoutTime(user);
            }
            return res.status(200).send({message:'Logged out successfully'})
        }
        catch(err){
            console.log(err);
            res.status(400).send(err);

        }
    }

    async logoutTime(user){
        user.logoutDay = Date.now();
        let sameLogoutDate = false;

        if(user.previousTimeHour.length>=1)
        {
            let oldDate = user.previousTimeHour[user.previousTimeHour.length-1].logoutDate.toISOString().split('T')[0];
            let newDate = new Date(Date.now()).toISOString().split('T')[0];
            if(oldDate == newDate)
                sameLogoutDate = true;
        }
        //now store whole object of login time and logout time with total working hour in user schema 
        let loginDate = new Date(user.loginDay);
        let logoutDate = new Date(user.logoutDay);
        let loginTime  = user.loginDay;
        let logoutTime  = user.logoutDay;
        let totalTimeInDay = logoutTime - loginTime;
        let totalHours = totalTimeInDay/(1000*60*60);
        const hours = Math.floor(totalHours);

        //fractionalMinutes
        const remainingMinutes = (totalHours-hours)*60;
        const minute = Math.round(remainingMinutes);
        if(sameLogoutDate)
            user.previousTimeHour.pop();
        user.previousTimeHour.push({
            loginDate:loginDate,
            logoutDate:logoutDate,
            Total_Woking_Hours: [hours,minute],
        })
        await user.save();
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