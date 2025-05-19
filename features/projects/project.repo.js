import mongoose from "mongoose";
import projectSchema from "./projects.schema.js";

const projectModel = mongoose.model('Projects',projectSchema)
export class ProjectReop{
    async getAllProjects(){
        const projects = await projectModel.find();
        return projects;
    }

    async getContributors(projectId){
        const contributors = await projectModel.findOne(projectId).populate("contributors");
        return contributors;
    }

    async getProjectInfo(projectId){
        const project = await projectModel.findOne({_id:projectId});
        return project;
    }

    async addProjects(data){
        const newProject = await projectModel.create(data);
        return newProject;
    }

    async deleteProjects(projectId){
        const deleteProject = await projectModel.deleteOne({_id:projectId});
        return deleteProject;
    }

    async addContributer(projectId,userId){
        const project = await projectModel.findByIdAndUpdate(projectId,{$addToSet:{contributors:userId}});
        return project;
    }

    async removeContributer(projectId,userId){
        const project = await projectModel.findByIdAndUpdate(projectId,{$pull:{contributors:userId}});
        return project;
    }
}