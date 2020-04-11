import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';


// import { LocalStorageService } from '../../services/local-storage.service';
import {AuthService} from '../../services/auth.service';
import {HeaderService} from '../../services/header.service';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userIsAuthenticated = false;
  private shoppingCart: string[];
  private entity: string;
  private notifications = [];
  private authListenerSubs: Subscription;
  private _msgSub: Subscription;

  constructor(private authService: AuthService, 
              private headerService: HeaderService,
              private chatService: ChatService,
              private router: Router) { }

  ngOnInit() {
    let userid = this.authService.getUserId();
    if(!this.chatService.getIsConnected()) {
      this.chatService.connectToSocket(userid);
    }

    const page = this.router.url.split('/')[1];

    // this.userId = this.authService.getUserId();
    this.entity = this.authService.getEntity();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    // might modify deponds on how to get notifications
    // this.notifications = this.headerService.getNotifications();

    // Get shoppingCart
    if(this.entity == 'student'){
      this.shoppingCart = this.headerService.getShoppingCartItems();
    }else if (this.entity == 'student'){
      this.shoppingCart = [];
    }

    // Get unread messages
    if(page != 'notifications'){
      this.chatService.loadUnreadMessages(userid)
        .then((msgs) => {
          this.notifications = msgs;
        })
        .catch((e) => {
          console.log(e);
        })
    }
    
    this._msgSub = this.chatService.getMessages(userid).subscribe(
      data => {
        console.log("Recieved new message");
        console.log(data);
        if(this.router.url.split('/')[1] != 'notifications') {
          console.log(this.router.url.split('/'))
          this.notifications.push('new message');
        }
        console.log(this.notifications);
      }
    )
  }

  navigateToNotifications() {
    this.notifications = [];
    this.router.navigate(['/notifications']);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this._msgSub.unsubscribe();
  }

}
