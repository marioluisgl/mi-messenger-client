import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  public userId: string = null;
  public name: string = null;

  constructor() { }

  //Obtener el id del usuario legueado desde el localStorage.
  getUserId(): string {
    if(this.userId === null){
      this.userId = localStorage.getItem('userid');
    }
      return this.userId;
    
  }

  //Obtener el nombre del usuario legueado desde el localStorage.
  getUserName(): string {
    if(this.name === null){
      this.name = localStorage.getItem('name');
    }
      return this.name;
    
  }

  
}
