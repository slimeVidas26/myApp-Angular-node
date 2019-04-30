import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-main',
  template: `
  <header>
    <a routerLink="">Home</a>
    <a routerLink="/users">Users</a>
    <a *ngIf="loggedUser" routerLink="/private">Private</a>
    <a *ngIf="loggedUser && loggedUser.role>=2" routerLink="/users">Admin</a>
    <a *ngIf="!loggedUser" routerLink="/login">Login</a>
    <span *ngIf="loggedUser">{{loggedUser.username}} <a (click)="doLogout()" href="#">Logout</a></span>
  </header>
  <router-outlet></router-outlet>
  `,
  styles: [`
    header {
      border-bottom:1px solid #000;
      padding-bottom:10px;
      margin-bottom:10px;
    }
    header a:not(:last-child) {
      margin-right:10px;
    }
  `]
})
export class MainComponent implements OnInit {

  loggedUser:any = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loggedUser = this.api.loggedUser;
  }

  doLogout() {
    this.api.clearToken();
    location.href = '/';
  }

}
