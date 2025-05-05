export class UserController{
    constructor(){

    }
    async registerUser(req,res){
        try{
            const{name,email,password,dob,gender} = req.body;
            // send data to repository to add register the user
            let result = true; //here repo function will be present 
            if(result)
                res.status(201).send('User added success');
            else{
                throw new Error('user cannot added');
            }
        }
        catch(err){
            console.log(err);
            res.status(400).send('something went wrong and error is ',err)
        }
    }
    async loginUser(req,res){
        try{
            const {email,password} = req.body;
            // first find user if exist check password
            //success then show cred page
            //if already logged in today then delete logouttime value
            //else throw an error
        }
        catch(err){
            console.log(err);
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

    async previousDayWorkHouse(req,res){
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

    async addProject(req,res){
        try{
            //admin can assign project to employee
        }
        catch(err){

        }
    }

    async removeProject(req,res){
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