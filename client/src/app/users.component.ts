import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  template: `
<h2>Users <button (click)="openEditUser(-1)">add</button></h2>
<div *ngIf="users.length; else nousers">
  <ul>
    <li *ngFor="let u of users; index as i">{{u.username}} <button (click)="openEditUser(i)">Edit</button></li>
  </ul>
</div>
<ng-template #nousers>
  <p>No Users</p>
</ng-template>
<div *ngIf="editing!=null">
  <p>
    <label>Username</label><input type="text" [(ngModel)]="tmpUser.username"><br>
    <label>Password</label><input type="text" [(ngModel)]="tmpUser.password">
  </p>
  <p>
    <button (click)="saveUser()">Save</button> 
    <span *ngIf="tmpUser.id!=null"><button (click)="deleteUser()">Delete</button></span>
    <button (click)="closeEditUser()">Close</button>
  </p>
</div>
  `,
  styles: [`
  label {
    display:inline-block;
    width:100px;
  }
  li {
    width:150px;
    line-height:30px;
  }
  li > button {
    float:right;
  }
  
  `]
})
export class UsersComponent implements OnInit {

  editing:any = null;
  editUserId:any = null;  
  tmpUser:any = {
    id: null,
    username:'',
    password:''
  };

  users:any[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe( (data) => {       
       this.users = data;
    });
  }

  openEditUser(i:number):void {
    this.editing = i;
    if(i>=0) {
      this.usersService.getUser(this.users[i].id).subscribe( (data) => {
        this.tmpUser.id = data.id;
        this.tmpUser.username = data.username;
        this.tmpUser.password = data.password;
      });
    }
    else {
      this.tmpUser.id = null;
      
      this.tmpUser.username = '';
      this.tmpUser.password = '';
    }
  }
  closeEditUser():void {
    this.editing = null;
  }

  saveUser():void {
    if(this.tmpUser.username!='' && this.tmpUser.password!='') {
      if(this.tmpUser.id==null) {
        console.log('creating',this.tmpUser);
        this.usersService.createUser(this.tmpUser.username,this.tmpUser.password).subscribe( (data) => {
          this.getAllUsers();
        });
      }
      else {
        console.log('editing',this.tmpUser);
        this.usersService.editUser(this.tmpUser.id,this.tmpUser.username,this.tmpUser.password).subscribe( (data) => {
          this.getAllUsers();
        });
      }
      this.editing = null;
    }
  }

  deleteUser():void {
    if(this.tmpUser.id!=null) {
      console.log('deleting',this.tmpUser.id);
      this.usersService.deleteUser(this.tmpUser.id).subscribe( (data) => {
        this.getAllUsers();
      });
      this.editing = null;
    }    
  }

}

