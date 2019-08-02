import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/* importing interfaces starts */
import { UsernameAvailable } from '../interfaces/username-available';
import { AuthRequest } from '../interfaces/auth-request';
import { Auth } from '../interfaces/auth';
import { UserSessionCheck } from '../interfaces/user-session-check';
import { MessageRequest } from '../interfaces/message-request';
import { MessagesResponse } from '../interfaces/messages-response';
import { Observable, observable } from 'rxjs';
/* importing interfaces ends */

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.apiUrl;
  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};


  constructor(	
    private _http: HttpClient,
    public _router: Router
  ) { }

  // Registar un user desde le frontend
  register(params: AuthRequest): Observable<Auth> {
    return this._http.post(`${this.API_URL}register`, JSON.stringify(params), this.httpOptions).pipe(
      map(
        (response: Auth) =>{
          return response;
        },
        (error) =>{
          throw error;
        }
      )
    );
  }

  //Loguear un ser desde el frontend
  login(params: AuthRequest): Observable<Auth> {
		return this._http.post(`${this.API_URL}login`, JSON.stringify(params), this.httpOptions).pipe(
			map(
				(response: Auth) => {
					return response;
				},
				(error) => {
					throw error;
				}
			)
		);
  }

  // Chequear la session del user desde el frontend
  /*el boolen en el tipo obs debe ser en minuscula*/
  userSessionCheck(): Observable<boolean> {
    const userId = localStorage.getItem('userid');
    return new Observable(observer =>{
      if(userId !== null && userId !== undefined){
        this._http.post(`${this.API_URL}userSessionCheck`, JSON.stringify({userId: userId}), this.httpOptions).subscribe(
          (response: UserSessionCheck) =>{
            if(response.error){
              this._router.navigateByUrl('/');
							return false;
            }
            console.log(response.name);
            localStorage.setItem('name', response.name);
						observer.next(true);
          },
          (error) =>{
            this._router.navigateByUrl('/');
            observer.next(false);
          }
        )

      }else{
        this._router.navigateByUrl('/');
        observer.next(false);
      }
    });
  }


  removeLSdata(): Promise<boolean>{
    return new Promise((resolve, reject) =>{
      try{

        localStorage.removeItem('userid');
        localStorage.removeItem('name');
        resolve(true);

      } catch(error){
        reject(error);
      }
    });
  }
  


}
