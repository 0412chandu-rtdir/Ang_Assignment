import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';  
import { authGuard } from './auth-guard';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { SignupComponent } from './signup-component/signup-component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    }
];
