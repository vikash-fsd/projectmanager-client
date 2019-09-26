import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../../shared/services/alert.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-add',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  Users: User[];
  userForm: FormGroup;
  userAction: string;
  SortKey: string;
  SearchKey: string;

  constructor(private userService: UserService, private formbuilder: FormBuilder, private alertService: AlertService) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,6}$')])],
      userId: ''
    });
    this.userAction = 'Add';
  }

  ngOnInit() {
    //load initial user lists
    this.refreshList();
  }
  
  refreshList() {
    this.userService.getUsersList()
      .subscribe(response => {
        response.success = true;
        if (response.success == true) {
          this.Users = response.data;
        }
      });
  }

  addorUpdateUser() {
    if (this.userAction == 'Add') {
      this.addUser();
    }
    else if (this.userAction == 'Update') {
      this.updateUser();
    }
  }

  addUser() {
    const newUser = <User>{
      firstname: this.userForm.controls['firstName'].value,
      lastname: this.userForm.controls['lastName'].value,
      employeeid: this.userForm.controls['employeeId'].value
    };

    this.userService.addUser(newUser)
      .subscribe(response => {
        console.log(response);
        if (response.success == true) {
          //show success message and refresh the list
          this.alertService.success('User added successfully!', 'Success', 3000);

          this.refreshList();
        }
        else
          this.alertService.error(response.message, 'Error', 3000);
      });
  }

  editUser(userID) {
    this.userService.getUser(userID)
      .subscribe(response => {
        if (response.success == true) {
          this.userForm = this.formbuilder.group({
            firstName: [response.data.firstname, Validators.required],
            lastName: [response.data.lastname, Validators.required],
            employeeId: [response.data.employeeid, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,6}$')])],
            userId: response.data.userid
          });

          this.userAction = 'Update';
        }
        else {
          this.alertService.error(response.message, 'Error', 3000);
        }
      });
  }

  updateUser() {
    const updateUser = <User>{
      userid: this.userForm.controls['userId'].value,
      firstname: this.userForm.controls['firstName'].value,
      lastname: this.userForm.controls['lastName'].value,
      employeeid: this.userForm.controls['employeeId'].value
    };

    this.userService.editUser(updateUser)
      .subscribe(response => {
        console.log(response);
        if (response.success == true) {
          //show success message and refresh the list
          this.alertService.success('User updated successfully!', 'Success', 3000);

          this.refreshList();

          this.reset();
        }
        else
          this.alertService.error(response.message, 'Error', 3000);
      });
  }

  deleteUser(userID){
    this.userService.deleteUser(userID)
    .subscribe(response => {
      if (response.success == true) {
        this.alertService.success('User deleted successfully!', 'Success', 3000);
        this.refreshList();
      }
      else {
        this.alertService.error(response.message, 'Error', 3000);
      }
    });
  }

  reset() {
    this.userForm.reset();
    this.userAction ='Add';
    this.SearchKey = null;
    this.SortKey = null;
  }

  search(searchValue: string) {
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

  sort(sortKey: string){
    if(sortKey=='firstName')
    this.SortKey = 'firstname';
    else if(sortKey=='lastName')
    this.SortKey = 'lastname';
    else if(sortKey=='employeeId')
    this.SortKey = 'employeeid';
    console.log(this.SortKey);
    this.sortUsers();
  }

  sortUsers() {
    this.userService.sortUsers(this.SortKey)
      .subscribe(response => {
        response.success = true;
        if (response.success == true) {
          this.Users = response.data;
        }
      });
  }
}