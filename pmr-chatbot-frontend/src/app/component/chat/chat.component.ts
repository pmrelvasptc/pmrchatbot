import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  // TODO: change
  botMessages = [
    "Hello there! I'm Jaquim Bot, how can I help you?",
    "Your order has been dispatched."
  ];

  userMessages = [
    "What is my order status?"
  ];

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  onCloseClick(): void {
    this.router.navigate(['']);
  }
}
