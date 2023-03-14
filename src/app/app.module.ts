import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { LandingPage } from './pages/landing/landing.page';
import { LandingPageListComponent } from './components/landing-page-list/landing-page-list.component';
import { GameDetailPage } from './pages/game-detail/game-detail.page';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MapComponent } from './components/map/map.component';
import { BiteCodeFormComponent } from './components/bite-code-form/bite-code-form.component';
import { FormsModule } from '@angular/forms';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { SquadInfoComponent } from './components/squad-info/squad-info.component';
import { MapPingComponent } from './components/map-ping/map-ping.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    LandingPageListComponent,
    GameDetailPage,
    NavBarComponent,
    MapComponent,
    BiteCodeFormComponent,
    GameInfoComponent,
    ChatComponent,
    ChatMessageComponent,
    SquadInfoComponent,
    MapPingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LeafletModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
