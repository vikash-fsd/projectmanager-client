import { Component, OnInit } from '@angular/core';
import { Project } from '../../../project/models/project';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  project: Project;
  task: Task;
  Tasks: Task[];
  SortKey: string;

  constructor(private taskService: TaskService, private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refreshList();
  }

  editTask(taskId: number) {
    this.taskService.getTask(taskId)
      .subscribe(response => {
        if (response.success == true) {
          this.router.navigate(['/task/manage'], { queryParams: { taskId: taskId } });
        }
        else {
          this.alertService.error(response.message, 'Error', 3000);
        }
      });
  }

  endTask(taskId: number) {
    this.taskService.getTask(taskId)
      .subscribe(response => {
      if (response.success == true) {
        this.task = response.data;
        this.task.status = 1;
        this.taskService.updateTask(this.task)
          .subscribe(response => {
            if (response.success == true) {
              this.alertService.success('Task Ended successfuly!', 'Success', 3000);
              this.sortTask("startdate");
            }
            else {
              this.alertService.error(response.message, 'Error', 3000);
            }
        });
      }
      else {
        this.alertService.error(response.message, 'Error', 3000);
      }
    }); 
  }

  sortTask(sortKey: string) {
    this.SortKey = sortKey;
    if(!this.project) {
    this.taskService.sortTask(sortKey)
      .subscribe(response => {
        if (response.success == true) {
          this.Tasks = response.data;
        }
        else {
          this.alertService.error(response.message, 'Error', 3000);
        }
      });
    }else {
      this.taskService.sortProjectTask(this.project.projectid, sortKey)
      .subscribe(response => {
        if (response.success == true) {
          this.Tasks = response.data;
        }
        else {
          this.alertService.error(response.message, 'Error', 3000);
        }
      });
    }
  }

  refreshList() {
    //fetch all tasks associated to this project and display
    this.taskService.getTasksList()
      .subscribe(response => {
        if (response.success == true) {
          if (response.data.length == 0) {
            this.alertService.warn('No taks found for the project:' + this.project.projectname, 'Warning', 3000);
          }

          this.Tasks = response.data;
          console.log(this.Tasks);
        }
        else {
          this.alertService.error('Error occured while fetching tasks for the project:' + this.project.projectname, 'Error', 3000);
        }
      });
  }

  //callback from Project search popup
  onProjectSelected(project: Project) {
    this.project = project;
    this.sortTask("startdate");
  }

}


