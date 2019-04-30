import { Injectable } from '@angular/core';
// add Router
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// no need for observable
//import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';

@Injectable()
export class AuthGuard implements CanActivate {
 // remove what was provided and rewrite below
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
  
  // inject service and router
  constructor(private api: ApiService, private router: Router) {}

  // canActivate need to use data from route
  canActivate(route: ActivatedRouteSnapshot) {
    let loggedUser = this.api.loggedUser;
    let passPermission = route.data.minLevelAllowed;
    if(loggedUser && loggedUser.role>=passPermission) {
      return true;
    }
    else {
      this.router.navigate(['/private']);
    } 
  }
}
