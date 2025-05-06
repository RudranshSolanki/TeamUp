import express from 'express'
import { UserController } from './user.controller.js';


const userController = new UserController();
const userRoute = express.Router();


userRoute.post('/registeruser',(req,res)=>{
    userController.registerUser(req,res);
})


userRoute.get('/loginuser',(req,res)=>{
    userController.loginUser(req,res);
})


export default userRoute;