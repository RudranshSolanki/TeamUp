import express from 'express'
import { UserController } from './user.controller.js';
import jwtAuth from '../../middlewares/auth.middleware.js';


const userController = new UserController();
const userRoute = express.Router();


userRoute.post('/registeruser',(req,res)=>{
    userController.registerUser(req,res);
})


userRoute.get('/loginuser',(req,res)=>{
    userController.loginUser(req,res);
})

userRoute.get('/logoutuser',jwtAuth,(req,res,next)=>{
    userController.logoutUser(req,res,next);
})


export default userRoute;