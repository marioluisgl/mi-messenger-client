import { Component, OnInit, DoCheck } from '@angular/core';
import { DataShareService } from './services/data-share.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  public title: string;
  public identityName:  string = null;

  constructor(
    private _dataShareService: DataShareService,
    private _userService: UserService,
    private _router: Router
  ){
    this.title = 'bippid';  
  }

  ngOnInit(){
    this.identityName = this._dataShareService.getUserName();
  }
  
  logout(){
    this._userService.removeLSdata().then(()=>{
      this._router.navigateByUrl('/');
    });

  }
  
  ngDoCheck(){
    this.identityName = this._dataShareService.getUserName();
  }


}
