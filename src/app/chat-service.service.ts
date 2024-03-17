import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$:WebSocketSubject<any>

  constructor() {
    this.socket$ =webSocket('ws://127.0.0.1:8000/ws');
  }

  sendMessage(msg: string):void {
    this.socket$.next(msg);
  }

  getMessages() {
    return this.socket$.asObservable();
  }

  closeConnection(): void {
  this.socket$.complete();
}

}
