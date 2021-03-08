import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  stompClient: any;

  connect(subTopic: string) {
    console.log('Initializing WebSocket Connection');
    const ws = new SockJS(environment.beWebSocket.url);
    this.stompClient = Stomp.over(ws);
    return new Observable<any>((observer) => {
      this.stompClient.connect({}, (frame) => {
        this.stompClient
          .subscribe(subTopic, (sdkEvent) => {
            console.log('Received message ', sdkEvent);
            observer.next(sdkEvent);
          });
      }, (error) => {
        console.error('Error connecting to the WebSocket: ', error);
        setTimeout(() => {
          this.connect(subTopic);
        });
      });
    });
  }

  disconnect(): void {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  sendMessage(message: any) {
    this.stompClient.send(environment.beWebSocket.chatTopic, {}, JSON.stringify(message));
  }

}
