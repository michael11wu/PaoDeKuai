import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { canActivateRoom } from './home/param-validity-guard.service';

export const routes: Routes = [
    { path: 'join', component: HomeComponent},
    { path: 'room/:id', component: GameComponent, canActivate: [canActivateRoom]},
    { path: '**', redirectTo: 'join' },
];
