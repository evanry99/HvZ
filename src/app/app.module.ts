import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPage } from './pages/landing/landing.page';
import { LandingPageListComponent } from './components/landing-page-list/landing-page-list.component';
import { GameDetailPage } from './pages/game-detail/game-detail.page';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GameDescriptionComponent } from './components/game-description/game-description.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    LandingPageListComponent,
    GameDetailPage,
    NavBarComponent,
    GameDescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
