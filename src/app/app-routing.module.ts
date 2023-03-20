import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/guards/role.guard';
import { ChatComponent } from './components/chat/chat.component';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { MapComponent } from './components/map/map.component';
import { PlayerEditComponent } from './components/player-edit/player-edit.component';
import { SquadInfoComponent } from './components/squad-info/squad-info.component';
import { GameDetailPage } from './pages/game-detail/game-detail.page';
import { LandingPage } from './pages/landing/landing.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing'
  },
  {
    path: 'game-detail',
    component: GameDetailPage,
    canActivate: [RoleGuard],
    data: {
      role: "uma_authorization"
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/game-detail/info'
      },
      {
        path: 'info',
        component: GameInfoComponent,
      },
      {
        path: 'map',
        component: MapComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'squad-info',
        component: SquadInfoComponent,
      },
      {
        path: 'player-edit',
        component: PlayerEditComponent,
      },
    ]
  },
  {
    path: 'landing',
    component: LandingPage,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
