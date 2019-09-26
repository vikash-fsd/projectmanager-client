import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ParentTask } from '../models/task';
import { ApiResponse } from '../../shared/models/shared';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


export interface IParentTaskService {
  searchParentTask(searchKey?: string): Observable<ApiResponse<ParentTask[]>>;
  getParentTask(parentid?: number): Observable<ApiResponse<ParentTask>>;
  getParentTaskList(): Observable<ApiResponse<ParentTask[]>>;
  addParentTask(newParent: ParentTask): Observable<ApiResponse<ParentTask>>;
}

@Injectable({
  providedIn: 'root'
})
export class ParentTaskService implements IParentTaskService {

  baseUri = environment.apiBaseUri;

  constructor(private http: HttpClient) { }

  
  searchParentTask(searchKey?: string): Observable<ApiResponse<ParentTask[]>> {

    var uri= `${this.baseUri}${environment.endpoint_search_parentTask}/${searchKey}`;

    return this.http
      .get<ApiResponse<ParentTask[]>>(uri);
  }

  getParentTask(parentid?: number): Observable<ApiResponse<ParentTask>> {

    var uri= `${this.baseUri}${environment.endpoint_parentTask_edit}/${parentid}`;

    return this.http
      .get<ApiResponse<ParentTask>>(uri);
  }

  getParentTaskList(searchKey?: string): Observable<ApiResponse<ParentTask[]>> {
    var uri = `${this.baseUri}${environment.endpoint_parentTask_get}`;

    return this.http
      .get<ApiResponse<ParentTask[]>>(uri);
  }

  addParentTask(newParent: ParentTask): Observable<ApiResponse<ParentTask>> {

    var uri = `${this.baseUri}${environment.endpoint_parentTask_add}`;

    return this.http
      .post<ApiResponse<ParentTask>>(uri, newParent);
  }
}
