import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailPage } from './pages/game-detail/game-detail.page';

const routes: Routes = [
  {
    path: 'game-detail',
    component: GameDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
