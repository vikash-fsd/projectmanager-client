import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentTaskService } from '../../services/parent-task.service';
import { TaskService } from '../../services/task.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Task, ParentTask } from '../../models/task';
import { Project } from '../../../project/models/project';
import { User } from '../../../user/models/user';

import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'create-task',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  taskId: any = null;

  taskStartDate: NgbDateStruct = {
    year: (new Date()).getFullYear(),
    month: (new Date()).getMonth() + 1, 
    day: (new Date()).getDate()
  };

  taskEndDate: NgbDateStruct = {
    year: (new Date()).getFullYear(),
    month: (new Date()).getMonth() + 1, 
    day: (new Date()).getDate() + 1
  };

  task = <Task>{
    taskname: '',
    priority: 0,
    startdate: moment().format('DD/MM/YYYY'),
    enddate: moment().add(1, 'days').format('DD/MM/YYYY')
  };

  isParentTask: boolean = false;

  constructor(private parentTaskService: ParentTaskService,
    private taskService: TaskService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    //set taskId that is sent from Edit Task
    this.route
      .queryParams
      .subscribe(params => {
        this.taskId = params['taskId']
      });

    if (this.taskId) {
      //load the task for update
      this.taskService.getTask(this.taskId)
        .subscribe(response => {
          this.task = response.data;

          var startDateSource=moment(this.task.startdate).toDate();
          this.taskStartDate = {
            year: startDateSource.getFullYear(),
            month: startDateSource.getMonth() + 1, 
            day: startDateSource.getDate()
          };
        
          var endDateSource=moment(this.task.enddate).toDate();
          this.taskEndDate = {
            year: endDateSource.getFullYear(),
            month: endDateSource.getMonth() + 1, 
            day: endDateSource.getDate()
          };
        });
    }

  }

  reset() {
    this.taskStartDate = {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1, 
      day: (new Date()).getDate()
    };
  
    this.taskEndDate = {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1, 
      day: (new Date()).getDate() + 1
    };

    this.task = <Task>{
      taskname: null,
      priority: 0,
      startdate: moment().format('DD/MM/YYYY'),
      enddate: moment().add(1, 'days').format('DD/MM/YYYY')
    };
    this.isParentTask = false;
    this.taskId = null;
    $('#taskName').removeClass('ng-invalid');
  }

  addTask() {
    if (this.isParentTask) {
      //create parent task
      const newParent = <ParentTask>{
        parenttaskname: this.task.taskname
        //projectid: this.task.Project.projectid
      };

      this.parentTaskService.addParentTask(newParent)
        .subscribe(response => {
          if (response.success == true) {
            this.alertService.success('Task added successfully!', 'success', 3000);
            this.reset();
          }
          else {
            this.alertService.error(response.message, 'Error', 3000);
          }
        });
    }
    else {

      this.task.startdate = moment(this.taskStartDate).add(-1, 'months').format("YYYY-MM-DD");
      this.task.enddate = moment(this.taskEndDate).add(-1, 'months').format("YYYY-MM-DD");
      this.task.projectid = this.task.Project.projectid;
      this.task.parentid = this.task.Parent.parentid;
      this.task.userid = this.task.User.userid;
      //create individual task with or without linked to parent task
      this.taskService.addTask(this.task)
        .subscribe(response => {
          if (response.success == true) {
            this.alertService.success('Task added successfuly!', 'Success', 3000);
            this.reset();
          }
          else {
            this.alertService.error(response.message, 'Error', 3000);
          }
        });
    }
  }

  updateTask() {
    this.task.startdate = moment(this.taskStartDate).add(-1, 'months').format("YYYY-MM-DD");
    this.task.enddate = moment(this.taskEndDate).add(-1, 'months').format("YYYY-MM-DD");
    
    this.taskService.updateTask(this.task)
      .subscribe(response => {
        if (response.success == true) {
          this.alertService.success('Task updated successfuly!', 'Success', 3000);
        }
        else {
          this.alertService.error(response.message, 'Error', 3000);
        }
      });
  }

  //callback from Project search popup
  onProjectSelected(project: Project) {
    this.task.Project = project;
  }

  //callback from Parent Task search popup
  onParentSelected(parent: ParentTask) {
    this.task.Parent = parent;
  }

  onUserSelected(user: User) {
    this.task.User = user;
  }
}
