import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Task } from '../models/task';
import { ApiResponse } from '../../shared/models/shared';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export interface ITaskService {
  getTask(taskId: number): Observable<ApiResponse<Task>>;
  getTasksList(projectId?: number, sortKey?:string): Observable<ApiResponse<Task[]>>;
  addTask(newUser: Task): Observable<ApiResponse<Task>>;
  updateTask(updateUser: Task): Observable<ApiResponse<Task>>;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService implements ITaskService {

  baseUri = environment.apiBaseUri;

  constructor(private http: HttpClient) { }

  
  getTask(taskId: number): Observable<ApiResponse<Task>> {

    var uri= `${this.baseUri}${environment.endpoint_task_edit}/${taskId}`;

    return this.http
      .get<ApiResponse<Task>>(uri);
  }

  getTasksList(): Observable<ApiResponse<Task[]>> {
    var uri = `${this.baseUri}${environment.endpoint_task_get}`;

    return this.http
      .get<ApiResponse<Task[]>>(uri);
  }

  addTask(newTask: Task): Observable<ApiResponse<Task>> {

    var uri = `${this.baseUri}${environment.endpoint_task_add}`;

    return this.http
      .post<ApiResponse<Task>>(uri, newTask);
  }

  updateTask(updateTask: Task): Observable<ApiResponse<Task>>
  {
    var uri = `${this.baseUri}${environment.endpoint_task_update}/${updateTask.taskid}`;

    return this.http
      .post<ApiResponse<Task>>(uri, updateTask);
  }

  endTask(taskId: number): Observable<ApiResponse<Task>>
  {
    var uri = `${this.baseUri}${environment.endpoint_task_delete}/${taskId}`;

    return this.http
      .get<ApiResponse<Task>>(uri);
  }

  sortTask(sortKey?: string): Observable<ApiResponse<Task[]>> {
    var uri = `${this.baseUri}${environment.endpoint_sort_task}${sortKey}`;

    return this.http
      .get<ApiResponse<Task[]>>(uri);
  }

  sortProjectTask(projectId?: number, sortKey?: string): Observable<ApiResponse<Task[]>> {
    var uri = `${this.baseUri}${environment.endpoint_sort_projecttask}${projectId}/${sortKey}`;

    return this.http
      .get<ApiResponse<Task[]>>(uri);
  }
}
