import { Task } from "../../task/models/task";

export interface Project {
    projectid?: number,
    projectname: string,
    startdate?: Date,
    enddate?: Date,
    priority: number,
    userid?:number,
    //Tasks?: Task[],
    numoftask: number,
    numofcomptask: number
}