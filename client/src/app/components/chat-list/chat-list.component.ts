import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { SocketService } from 'src/app/services/socket.service';
import { ChatService } from 'src/app/services/chat.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';


import { ChatListResponse } from 'src/app/interfaces/chat-list-response';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  loading = true;
	userId: string = null;
	selectedUserId: string = null;
  chatListUsers: User[] = [];
  
  constructor(
    private _userService: UserService,
    private _socketService: SocketService,
    private _chatService: ChatService,
    private _dataShareService: DataShareService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.userId = this._dataShareService.getUserId();
    this._socketService.getChatList(this.userId).subscribe((chatListResponse: ChatListResponse)=>{
      this.renderChatList(chatListResponse);
      console.log(this.chatListUsers);
    });
  }


  renderChatList(chatListResponse: ChatListResponse): void {
    if(!chatListResponse.error){

      if(chatListResponse.singleUser){

        if(this.chatListUsers.length > 0){
          this.chatListUsers = this.chatListUsers.filter((obj: User)=>{
            return obj.id !== chatListResponse.chatList[0].id;
          });
        }

        this.chatListUsers = this.chatListUsers.concat(chatListResponse.chatList);

      }else if(chatListResponse.userDisconnected){

        const loggedOutUser = this.chatListUsers.findIndex((obj: User)=> obj.id === chatListResponse.userid);
        if(loggedOutUser >=0){
          this.chatListUsers[loggedOutUser].online = 'false';
        }

      }else{
        this.chatListUsers = chatListResponse.chatList;
      }
      this.loading = false;
    }else{
      alert(`Unable to load Chat list, Redirecting to Login.`);
			this._userService.removeLSdata()
				.then(async (removedLs: boolean) => {
					await this._router.navigateByUrl('/home');
					this.loading = false;
				})
				.catch(async (error: Error) => {
					alert(' This App is Broken, we are working on it. try after some time.');
					await this._router.navigate(['/']);
					console.warn(error);
					this.loading = false;
				});
    }


  }

}
