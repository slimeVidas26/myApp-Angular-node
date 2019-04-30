import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  _token:any = null;
  _loggedUser:any = null;

  constructor(private http: HttpClient) {  
    let _sess = localStorage.getItem('_sess');
    if(_sess) {
      let d = JSON.parse(_sess);
      this._token = d.token;
      this._loggedUser = d.user;
    }
  }

  doLogin(u,p) {
    return this.http.post< any >('http://localhost:3000/login',{
      username: u,
      password: p
    });
  }

  getPrivateData(inpParam) {
    return this.http.post< any >('http://localhost:3000/private',{
      data: inpParam
    });
  }

  getAdminData(inpParam) {
    return this.http.post< any >('http://localhost:3000/private/admin',{
      data: inpParam
    });
  }

  getPublicData(inpParam) {
    return this.http.post< any >('http://localhost:3000/public',{
      data: inpParam
    });
  }

  storeLogin(obj) {
    localStorage.setItem('_sess',JSON.stringify(obj));
  }

  get token() {
    return this._token;
  }

  get loggedUser() {
    return this._loggedUser;
  }

  clearToken() {
    this._token = null;
    this._loggedUser = null;
    localStorage.removeItem('_sess');
  }

}
