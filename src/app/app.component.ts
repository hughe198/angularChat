import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './chat-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'angularChat';
  message = '';
  messages:string[] = []
  private messagesSubscription:Subscription;

  constructor(private websocketService:WebsocketService){
    this.messagesSubscription = this.websocketService.getMessages().subscribe({
      next:(msg:string)=>{this.messages.push(msg)},
      error: (error: any) => console.error('WebSocket error:', error),
      complete: () => console.log('WebSocket connection completed')
    })
  }
  sendMessage(): void {
    if (this.message.trim()) {
      this.websocketService.sendMessage(this.message);
      this.message = ''; // Clear the input after sending
    }
  }

  ngOnDestroy(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
    this.websocketService.closeConnection();
  }
}
