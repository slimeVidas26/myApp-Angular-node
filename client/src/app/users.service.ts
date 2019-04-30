import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {

  endpoint: string = 'http://localhost:3000/users';

  constructor( private http: HttpClient) { }

  getUsers() {
    return this.http.get< any[] >(`${this.endpoint}/`);
  }

  getUser(id) {
    return this.http.get< any >(`${this.endpoint}/${id}`);
  }

  createUser(username,password) {
    return this.http.post< any >(`${this.endpoint}/`,{
      
      username: username,
      password:password,
    });
  }

  editUser(id,username,password) {
    return this.http.put< any >(`${this.endpoint}/${id}`,{
     
      username: username,
      password: password,
    });
  }

  deleteUser(id) {
    return this.http.delete< any >(`${this.endpoint}/${id}`);
  }

}
