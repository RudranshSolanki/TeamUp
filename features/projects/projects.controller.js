import { ProjectReop } from "./project.repo.js";


export class ProjectController{
    constructor(){
        this.projectRepo = new ProjectReop();
    }

    async getAllProjects(req,res){
        const projects = await this.projectRepo.getAllProjects();
        return res.status(200).send({projects:projects})
    }

    async getContributors(req,res){
        const {projectId} = req.body;
        const contributors = await this.projectRepo.getContributors(projectId);
        return res.status(200).send({contributors:contributors})
    }

    async getProjectInfo(req,res){
        const {projectId} = req.body;
        const projectData = await this.projectRepo.getProjectInfo(projectId);
        return res.status(200).send(projectData);
    }

    async addProjects(req,res){
        const {title,description} = req.body;
        const newProject = await this.projectRepo.addProjects({title,description});
        return res.status(201).send("project has been added");
    }

    async deleteProjects(req,res){
        const {projectId} = req.body;
        const project = await this.projectRepo.deleteProjects(projectId);
        return res.status(201).send("project has been deleted");
    }

    async addContributer(req,res){
        const {projectId,userId} = req.body;
        const result = await this.projectRepo.addContributer(projectId,userId);
        return res.status(201).send("project contributor has been added");
    }

    async removeContributer(req,res){
        const {projectId,userId} = req.body;
        const result = await this.projectRepo.removeContributer(projectId,userId);
        return res.status(201).send("project contributor removed")
    }
}