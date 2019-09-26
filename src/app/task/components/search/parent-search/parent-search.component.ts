import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ParentTaskService } from '../../../services/parent-task.service';
import { ParentTask } from '../../../models/task';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'parent-task-search',
  templateUrl: './parent-search.component.html',
  styleUrls: ['./parent-search.component.css']
})
export class ParentSearchComponent implements OnInit {
  @Input()  name: string;
  @Output() parentSelected = new EventEmitter<ParentTask>();

  ParentTasks: ParentTask[];
  SearchKey: string;
  SelectedParentID: number;
  enableAdd:boolean;

  constructor(private parentService: ParentTaskService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(){
    this.parentService.getParentTaskList()
      .subscribe(response => {
        if (response.success == true) {
          this.ParentTasks = response.data;
        }
      });
      this.enableAdd = false;
  }

  
  searchParent(searchValue: string) {
    this.SearchKey = searchValue;
    if(searchValue == '') {
      this.refreshList();
    }else {
      this.parentService.searchParentTask(this.SearchKey)
      .subscribe(response => {
        if (response.success == true) {
          this.ParentTasks = response.data;
        }
      });
      this.enableAdd = false;
    }
  }

  selectParent(parentID: number){
    this.SelectedParentID = parentID;
    this.enableAdd = true;
  }

  addParent(){
    this.parentService.getParentTask(this.SelectedParentID)
      .subscribe(response =>{
          if(response.success==true)
          {
            this.parentSelected.emit(response.data);
            $('#parentSearchModel').modal('toggle');
          }
      });
  }
}
