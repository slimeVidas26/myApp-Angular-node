import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-login',
  template: `
  <h2>Login</h2>
  <p>
    <label>Username</label>
    <input type="text" [(ngModel)]="username" (keydown.enter)="doLogin()">
  </p>
  <p>
    <label>Password</label>
    <input type="text" [(ngModel)]="password" (keydown.enter)="doLogin()">
  </p>
  <p>
    <button (click)="doLogin()">Login</button><span class="notice">{{notice}}</span>
  </p>

  `,
  styles: [`
    label {
      display:inline-block;
      width:100px;
    }
    .notice {
      margin-left:20px;
    }
  `]
})
export class LoginComponent implements OnInit {

  username:string = '';
  password:string = '';
  notice:string = '';

  constructor(private api: ApiService) { }

  ngOnInit() {   }

  doLogin() {
    if(this.username!='' && this.password!='') {
      console.log('Logging',this.username,this.password);
      this.notice = 'Logging...';
      this.api.doLogin(this.username,this.password).subscribe( 
        result => {
          if(result && result.token) {
            this.api.storeLogin(result);
            location.href='/users';
          }
          else {
            this.notice = 'Invalid Login';
          }
        },
        err => {
          this.notice = 'Server Error';
        }
      );      
    }
  }

}
