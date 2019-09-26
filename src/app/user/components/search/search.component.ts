import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
declare var $ :any;

@Component({
  selector: 'user-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input()  name: string;
  @Output() userSelected = new EventEmitter<User>();

  Users: User[];
  SortKey: string;
  SearchKey: string;
  SelectedUserID: number;
  enableAdd:boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(){
    this.userService.getUsersList()
      .subscribe(response => {
        if (response.success == true) {
          this.Users = response.data;
        }
      });
      this.enableAdd = false;
  }

  searchUser(searchValue: string) {
    if(searchValue == '') {
      this.refreshList();
    }else {
      this.SearchKey = searchValue;
      this.searchUsers();
    }
  }

  searchUsers() {
    this.userService.searchUser(this.SearchKey)
      .subscribe(response => {
        response.success = true;
        if (response.success == true) {
          this.Users = response.data;
        }
      });
  }

  selectUser(userID: number){
    this.SelectedUserID = userID;
    this.enableAdd = true;
  }

  addUser(){
    this.userService.getUser(this.SelectedUserID)
      .subscribe(response =>{
          if(response.success==true)
          {
            this.userSelected.emit(response.data);
            $('#userSearchModel').modal('toggle');
          }
      });
  }
}