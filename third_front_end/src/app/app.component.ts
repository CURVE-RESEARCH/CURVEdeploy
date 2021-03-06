import { Component, OnInit } from '@angular/core';

import {AuthService} from './services/auth.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}


  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
