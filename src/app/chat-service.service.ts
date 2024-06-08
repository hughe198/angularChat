import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { Message } from '../message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$:WebSocketSubject<any>

  constructor() {
    this.socket$ =webSocket('ws://127.0.0.1:4000/ws');
  }

  sendMessage(msg: string,name:string):void {
    const message:Message = {
      message:msg,
      name:name
    }
    this.socket$.next(message);
  }

  getMessages(): Observable<Message>  {
    return this.socket$.asObservable();
  }

  closeConnection(): void {
  this.socket$.complete();
}

}
