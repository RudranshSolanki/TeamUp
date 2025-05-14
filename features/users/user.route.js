import express from 'express'
import { UserController } from './user.controller.js';
import jwtAuth from '../../middlewares/auth.middleware.js';


const userController = new UserController();
const userRoute = express.Router();

// register user
userRoute.post('/registeruser',(req,res)=>{
    userController.registerUser(req,res);
})

// login user
userRoute.get('/loginuser',(req,res)=>{
    userController.loginUser(req,res);
})

// logout user
userRoute.get('/logoutuser',jwtAuth,(req,res,next)=>{
    userController.logoutUser(req,res,next);
})


// get user detail
userRoute.get('/getuserdetail',jwtAuth,(req,res,next)=>{
    userController.getUserDetails(req,res,next);
})

// get user previous working hour
userRoute.get('/getuserpreviousworkhours',jwtAuth,(req,res,next)=>{
    userController.previousDayWorkHour(req,res,next);
})

// get user project
userRoute.get('/getuserproject',jwtAuth,(req,res,next)=>{
    userController.getUserProject(req,res,next)
})

export default userRoute;