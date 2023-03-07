import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPage } from './pages/landing/landing.page';
import { LandingPageListComponent } from './components/landing-page-list/landing-page-list.component';
import { GameDetailPage } from './pages/game-detail/game-detail.page';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    LandingPageListComponent,
    GameDetailPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
