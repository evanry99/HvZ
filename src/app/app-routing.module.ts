import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDescriptionComponent } from './components/game-description/game-description.component';
import { GameRulesComponent } from './components/game-rules/game-rules.component';
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
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/game-detail/description'
      },
      {
        path: 'description',
        component: GameDescriptionComponent,
      },
      {
        path: 'rules',
        component: GameRulesComponent,
      }
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
