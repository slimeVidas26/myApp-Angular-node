import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-home',
  template: `
  <h1>Home Page</h1>
<h2>here goes all the images</h2>
  <div *ngIf="stamData">
    <pre>{{stamData|json}}</pre>
  </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  stamData:any = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getPublicData();
    this.loadSessionData();
  }

  getPublicData() {
    this.api.getPublicData({ts: + new Date()}).subscribe( 
      result => {
        this.stamData.push(result);
      },
      err => {
        this.stamData.push({
          notice: "Something bad happened"
        })
      }
    );      
  }

  loadSessionData() {
    this.stamData.push({token:this.api.token});
    this.stamData.push({user:this.api.loggedUser});
  }

}
