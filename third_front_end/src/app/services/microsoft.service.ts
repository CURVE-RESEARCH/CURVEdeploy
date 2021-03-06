import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';

import { MicrosoftAuthSettings } from '../microsoftConfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MicrosoftService {

  public authenticated: boolean;
  public user: any;
  private graphClient: Client;
  private microsoftEvents: any;

  constructor(
    private msalService: MsalService,
    private http: HttpClient
  ) {
    this.authenticated = false;
    this.user = null;

    this.graphClient = Client.init({
      authProvider: async (done) => {
        let token = await this.getAccessToken()
          .catch((e) => {
            console.log(e);
            done(e, null);
          });
          if(token) {
            done(null, token);
          } else {
            done('could not get access token', null);
          }
      }
    })

  }

  // Sign in function
  public async signIn() {
    let result = await this.msalService.loginPopup(MicrosoftAuthSettings)
      .catch((error) => {
        console.log(error)
      });

    if (result) {
      this.authenticated = true;
      // Temporary placeholder
      this.user = {};
      this.user.displayName = "Adele Vance";
      this.user.email = "AdeleV@contoso.com";
    }
  }

    // Sign out
    signOut(): void {
      this.msalService.logout();
      this.user = null;
      this.authenticated = false;
    }

      // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(MicrosoftAuthSettings)
      .catch((error) => {
        console.log(error);
      });

    if (result) {
      // Temporary to display token in an error box
      return result.accessToken;
    }
    return null;
  }

  async getEvents(): Promise<any> {
    try {
      let result =  await this.graphClient
        .api('/me/events')
        .select('subject,organizer,start,end')
        .get();
      return result.value;
    } catch (error) {
      console.log(error);
    }
  }

  saveMicrosoftEvents(events) {
    return new Promise((res, rej) => {
        for(let i = 0; i < events.length; i++) {
          events[i].summary = events[i].subject;
        }
        this.microsoftEvents = events;
        let calendarid = localStorage.getItem('userId');
        let params = {
          calendarid: calendarid,
          events: events
        }
        this.http.post('http://localhost:3000/events/saveMicrosoftEvents', params).subscribe(
          data => {
            let d:any = data;
            res(d.newEvents);
          }, error => {
            console.log(error);
          }
        )
    })
  }

  getMicrosoftEvents() {
    return this.microsoftEvents;
  }



}
