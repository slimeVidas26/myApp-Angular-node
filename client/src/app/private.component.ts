import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-private',
  template: `
  <h1>Private Area</h1>
  <h2>Private images</h2>
  <div *ngIf="pageData">
    <pre>{{pageData|json}}</pre>
  </div>
  `,  
  styles: []
})
export class PrivateComponent implements OnInit {

  pageData:any = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getPrivateData();
  }

  getPrivateData() {
    this.api.getPrivateData({ts: + new Date()}).subscribe( 
      result => {
        this.pageData = result;
      },
      err => {
        this.pageData = "Something bad happened"
      }
    );      
  }

}
