import { RouterModule,Routes} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
                    

const pagesRoutes:Routes =[
    {
        path:'dashboard',
        component:DashboardComponent,
        data:{titulo:'Dashboard'}
    },
    {path:'',redirectTo:('dashboard'),pathMatch:'full'},
];

export const PAGES_ROUTES=RouterModule.forChild(pagesRoutes);