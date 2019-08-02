import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

/* Importing services starts*/
import { FormService } from '../../services/form.service';
import { UserService } from '../../services/user.service';
/* Importing services ends*/

/* importing interfaces starts */
import { UsernameAvailable } from './../../interfaces/username-available';
import { Auth } from './../../interfaces/auth';
import { async } from 'q';
/* importing interfaces ends */

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public setTabPosition = 'center';
	public overlayDisplay = false;
	public isuserNameAvailable = false;
  public loginError = false;
  public show = true;
  
  private loginForm: FormGroup;
  private registerForm: FormGroup;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _formService: FormService
  ) { 
    this.loginForm = _formService.createLoginForm();
    this.registerForm = _formService.createRegistrationForm();
  }

  ngOnInit() {
    this.overlayDisplay = true;
    this._userService.userSessionCheck().subscribe( async (loggedIn: boolean)=>{
    
      if(loggedIn){
        await this._router.navigateByUrl('/chat');
				this.overlayDisplay = false;
      }
      else{
        this.overlayDisplay = false;
        await this._router.navigateByUrl('/auth');
      }
    });
  }

  showRegister(){
    if(this.show === true){
      this.show = false;
    }else{
      this.show = this.show;
    }
  }


  register(): void {
    if(this.registerForm.valid){
      this.overlayDisplay = false;
      this._userService.register(this.registerForm.value).subscribe(
        (response: Auth) => {
       
          // para response.result o response.resul.name/_id hay que modificar el register del backend
          localStorage.setItem('userid', response.userId);
        	this._router.navigate(['/chat']);
        },
        (error) =>{
          this.overlayDisplay = true;
          console.log(error);
        }
      )
    }
  }

  login(): void {
    if(this.loginForm.valid){
      this.overlayDisplay = true;
      this._userService.login(this.loginForm.value).subscribe(
        (response: Auth) =>{
          this.overlayDisplay = false;
          localStorage.setItem('userid', response.userId);
          this._router.navigate(['/chat']);
        },
        (error) =>{
          console.log(error);
          this.overlayDisplay = false;
          this.loginError = true;
        }
      );
    }
  }



}
