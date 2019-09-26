import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'project-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input()  name: string;
  @Output() projectSelected = new EventEmitter<Project>();

  Projects: Project[];
  SortKey: string;
  SearchKey: string;
  SelectedProjectID: number;
  enableAdd:boolean;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(){
    this.projectService.getProjects()
      .subscribe(response => {
        if (response.success == true) {
          this.Projects = response.data;
        }
      });
      this.enableAdd = false;
  }

  
  searchProject(searchValue: string) {
    if(searchValue == '') {
      this.refreshList();
    }else {
      this.SearchKey = searchValue;
      this.searchProjects();
    }
  }

  searchProjects() {
    this.projectService.searchProject(this.SearchKey)
      .subscribe(response => {
        response.success = true;
        if (response.success == true) {
          this.Projects = response.data;
        }
      });
  }

  selectProject(projectID: number){
    this.SelectedProjectID = projectID;
    this.enableAdd = true;
  }

  addProject(){

    this.projectService.getProject(this.SelectedProjectID)
      .subscribe(response =>{
          if(response.success==true)
          {
            this.projectSelected.emit(response.data);
            $('#projectSearchModel').modal('toggle');
          }
      });
  }
}
