import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(
    private _router: Router,
    private _userService: UserService
  ) { }

  // canActivate(){
  //   if(localStorage.getItem('userid')){
  //      this._router.navigateByUrl('/home'); 
  //   return false;
  //   }
   
  // }

  canActivate(): Observable<boolean> {
		return this._userService.userSessionCheck();
	}
}
