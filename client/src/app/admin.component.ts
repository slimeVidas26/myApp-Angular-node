import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-admin',
  template: `
  <h2>Admin Area</h2>
  <div *ngIf="pageData">
  <pre>{{pageData|json}}</pre>
</div>
  `,
  styles: []
})
export class AdminComponent implements OnInit {

  pageData:any = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAdminData();
  }

  getAdminData() {
    this.api.getAdminData({ts: + new Date()}).subscribe( 
      result => {
        this.pageData = result;
      },
      err => {
        this.pageData = "Something bad happened"
      }
    );      
  }

}
