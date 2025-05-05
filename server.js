import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import { ConnectToDb } from './config/db.config.js';

const server = express();

const Port =  process.env.PORT



server.listen(Port,()=>{
    console.log('server started ');
    ConnectToDb();
})