import express from 'express'
import { ProjectController } from './projects.controller.js'

const projectRoute = express.Router();
const projectController = new ProjectController();



projectRoute.get('/getprojects',(req,res)=>{
    projectController.getAllProjects(req,res);
})

projectRoute.get('/getprojectinfo',(req,res)=>{
    projectController.getProjectInfo(req,res)
})

projectRoute.get('/getcontributors',(req,res)=>{
    projectController.getContributors(req,res);
})

projectRoute.post('/addproject',(req,res)=>{
    projectController.addProjects(req,res);
})

projectRoute.delete('/deleteproject',(req,res)=>{
    projectController.deleteProjects(req,res);
})

projectRoute.put('/addcontributor',(req,res)=>{
    projectController.addContributer(req,res);
})

projectRoute.put('/removecontributor',(req,res)=>{
    projectController.removeContributer(req,res);
})

export default projectRoute;