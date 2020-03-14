import {RouterModule,Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './home/home.component';



const appRoutes:Routes=[
    {path:'', component: HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {
        path:'panel',
        component:PagesComponent,
        loadChildren:'./pages/pages.module#PagesModule'
    }
];

export const APP_ROUTES=RouterModule.forRoot(appRoutes,{useHash:true});