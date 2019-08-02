import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { SocketService } from 'src/app/services/socket.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public setTabPosition = 'center';
  public userId: string = null;
	public name: string = null;
  public overlayDisplay = true;
  
  constructor(
    private _chatService: ChatService,
    private _socketService: SocketService,
    private _userService: UserService,
		private _dataShareService: DataShareService,
		private _router: Router
  ) { }

  ngOnInit() {
    this.userId = this._dataShareService.getUserId();
    this.name =this._dataShareService.getUserName();
    this.establishSocketConnection();

  }
  
  
  async establishSocketConnection() {
    try{
      if (this.userId === '' || typeof this.userId === 'undefined' || this.userId === null) {
        this._router.navigateByUrl('/')
      } else{
        await this._socketService.connectSocket(this.userId);
      }

    } catch(error){
        alert('something went wrong');
    }
  }

}
