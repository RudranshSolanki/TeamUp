import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import { ConnectToDb } from './config/db.config.js';
import userRoute from './features/users/user.route.js';
import cookieParser from 'cookie-parser';
import projectRoute from './features/projects/project.route.js';

const server = express();

const Port =  process.env.PORT

//cookie parser
server.use(cookieParser())
//parsing to json
server.use(express.json());

// routing 
server.use('/user',userRoute);
server.use('/project',projectRoute)


server.listen(Port,()=>{
    console.log('server started ');
    ConnectToDb();
})