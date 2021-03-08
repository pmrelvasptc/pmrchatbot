import { Router } from '@angular/router';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../../../shared/service/websocket.service';

export enum Agent {
  BOT, USER
}

export interface Message {
  agent: Agent;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('messagesContainer', { static: false }) private messagesContainerEl: ElementRef;

  messages: Message[] = [];
  userMessageInput: string;

  constructor(private router: Router,
              private webSocketService: WebsocketService) {
  }

  ngOnInit() {
    this.webSocketService.connect('/user/queue/chatBot')
      .subscribe((response) => {
        console.log('chatComponent: ', JSON.stringify(response, null, 2));
        try {
          const responseJson = JSON.parse(response.body);
          this.messages.push({
            agent: Agent.BOT,
            content: responseJson.content
          });

          this.messagesContainerEl.nativeElement.scrollTop = this.messagesContainerEl.nativeElement.scrollHeight + 50;
        } catch (e) {
          console.error('error parsing');
        }
      });
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }

  onCloseClick(): void {
    this.router.navigate(['']);
  }

  onSendClick(): void {
    this.webSocketService.sendMessage({
      username: 'Pedro',
      content: this.userMessageInput
    });
    this.messages.push({
      agent: Agent.USER,
      content: this.userMessageInput
    });
    this.userMessageInput = '';
  }

  isBotMessage(message: Message): boolean {
    return message.agent === Agent.BOT;
  }

  isUserMessage(message: Message): boolean {
    return message.agent === Agent.USER;
  }
}
