import { User } from "../../user/models/user";
import { Project } from "../../project/models/project";

export interface Task {
    taskid?: number,
    taskname: string,
    startdate?: string,
    enddate?: string,
    priority: number,
    parentid: number,
    projectid: number,
    userid: number,
    status: number,
    User?:User,
    Parent?:ParentTask,
    Project?:Project
}

export interface ParentTask {
    parentid?: number,
    parenttaskname: string
}