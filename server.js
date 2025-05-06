import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import { ConnectToDb } from './config/db.config.js';
import userRoute from './features/users/user.route.js';

const server = express();

const Port =  process.env.PORT
//parsing to json
server.use(express.json());

// routing 
server.use('/user',userRoute);


server.listen(Port,()=>{
    console.log('server started ');
    ConnectToDb();
})