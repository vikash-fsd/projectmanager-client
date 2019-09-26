import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Project } from '../models/project';
import { ApiResponse } from '../../shared/models/shared';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    baseUri = environment.apiBaseUri;

    constructor(private http: HttpClient) { }

    getProjects(): Observable<ApiResponse<Project[]>> {

        var uri = `${this.baseUri}${environment.endpoint_project_get}`;

        return this.http
            .get<ApiResponse<Project[]>>(uri);
    }

    getProject(projectId: number): Observable<ApiResponse<Project>> {

        var uri = `${this.baseUri}${environment.endpoint_project_edit}/${projectId}`;

        return this.http
            .get<ApiResponse<Project>>(uri);
    }

    addProject(newProject: Project): Observable<ApiResponse<Project>> {

        var uri = `${this.baseUri}${environment.endpoint_project_add}`;

        return this.http
            .post<ApiResponse<Project>>(uri, newProject);
    }

    
  updateProject(updateProject: Project): Observable<ApiResponse<Project>> {

    var uri = `${this.baseUri}${environment.endpoint_project_update}/${updateProject.projectid}`

    return this.http
      .post<ApiResponse<Project>>(uri, updateProject);
  }

    deleteProject(projectID: number): Observable<ApiResponse<Project>> {

        var uri = `${this.baseUri}${environment.endpoint_project_delete}/${projectID}`

        return this.http
            .get<ApiResponse<Project>>(uri);
    }

    sortProjects(sortKey?: string): Observable<ApiResponse<Project[]>> {
        var uri = `${this.baseUri}${environment.endpoint_sort_project}${sortKey}`;
    
        return this.http
          .get<ApiResponse<Project[]>>(uri);
      }

      searchProject(searchKey?: string): Observable<ApiResponse<Project[]>> {
        var uri = `${this.baseUri}${environment.endpoint_search_project}${searchKey}`;
    
        return this.http
          .get<ApiResponse<Project[]>>(uri);
      }
}
