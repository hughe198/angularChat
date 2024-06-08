import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './chat-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from '../message';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'angularChat';
  message = '';
  name = "";
  messages:Message[] = []
  constructor(private websocketService:WebsocketService){}
  ngOnInit(): void {
    this.websocketService.getMessages().subscribe((msg:Message)=>{
      this.messages.push(msg)
    })
  }


  sendMessage(): void {
    if (this.message.trim()) {
      this.websocketService.sendMessage(this.message,this.name);
      this.message = ''; // Clear the input after sending
    }
  }
}