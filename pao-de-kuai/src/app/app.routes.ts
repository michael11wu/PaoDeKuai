import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/join',
        pathMatch: 'full'
    },
    {
        path: 'join',
        component: HomeComponent
    }
];
