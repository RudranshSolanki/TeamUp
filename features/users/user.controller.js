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
            let sameDate = await this.sameDate(user.loginDay,new Date());
            if(!sameDate){
                user.loginDay = Date.now();
                
            }
            
        }
        await user.save();
    }
    async logoutTime(user){
        let sameLogoutDate = false;
        if(user.logoutDay == null)
            sameLogoutDate = false;
        else{
            let sameDate = await this.sameDate(user.logoutDay,new Date(Date.now()));
            if(sameDate)
                sameLogoutDate = true;
        }
        user.logoutDay = Date.now();
        //now store whole object of login time and logout time with total working hour in user schema 
        let loginDate = new Date(user.loginDay).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        let logoutDate = new Date(user.logoutDay).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
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

    async sameDate(day1,day2){
        let date1 = day1.toISOString().split('T')[0];
        let date2 = day2.toISOString().split('T')[0];
        if(date1 == date2)
            return true;
        return false;
    }
    async getUserDetails(req,res){
        try{
            //simple fetching data from db
            const email = req.userEmail;
            const user = await this.userRepo.findUser(email);
            if(user)
            {
                return res.status(200).send({message:user});
            }
            else
                throw new Error('Did not find user');
        }
        catch(err){
            return res.stats(400).send(err);
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

    

    async previousDayWorkHour(req,res){
        try{
            // get array of previousTimeHour in db
            const userEmail = req.userEmail;
            const userHours = await this.userRepo.previousDayWorkHour(userEmail);
            res.status(200).send(userHours);
        }
        catch(err){
            res.stats(400).send({err:err})
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