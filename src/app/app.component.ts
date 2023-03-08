import { Component } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login/socialauth.service';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login/public-api';
import { HttpClient } from "@angular/common/http" 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private accessToken = '';

  constructor(
    private authService: SocialAuthService, private httpClient: HttpClient) { }

  signOut(): void {
    this.authService.signOut();
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }

  getGoogleCalendarData(): void {
    if (!this.accessToken) return;

    this.httpClient
      .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((events) => {
        alert('Look at your console');
        console.log('events', events);
      });
  }
}