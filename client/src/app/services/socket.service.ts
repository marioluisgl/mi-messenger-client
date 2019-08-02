import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

/* importing interfaces starts */
import { Auth } from '../interfaces/auth';
import { ChatListResponse } from '../interfaces/chat-list-response';
import { MessageSocketEvent } from '../interfaces/message-socket-event';
import { Message } from '../interfaces/message';
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


  
}
