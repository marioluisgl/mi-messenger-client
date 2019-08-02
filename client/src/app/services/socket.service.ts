import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

/* importing interfaces starts */
import { Auth } from '../interfaces/auth';
import { ChatListResponse } from '../interfaces/chat-list-response';
import { MessageSocketEvent } from '../interfaces/message-socket-event';
import { Message } from '../interfaces/message';
import { Observable } from 'rxjs';
/* importing interfaces ends */



@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private SOCKET_URL = environment.socketUrl;
  private socket;

  constructor() { }


  /*
	* Method to connect the users to socket
  */
  connectSocket(userId: string): void {
    this.socket = io(this.SOCKET_URL, { query: `userId=${userId}` });
  }

  /*
	* Method to receive chat-list-response event.
  */
  getChatList(userId: string = null): Observable<ChatListResponse>{
    if(userId !== null){
      this.socket.emit('chat-list', {userId: userId});
    }
    return new Observable(observer =>{
      this.socket.on('chat-list-response', (data: ChatListResponse)=> {
        observer.next(data);
      });
      return () =>{
        this.socket.disconnect();
      };
    });
  }


  
}
