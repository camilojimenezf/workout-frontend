import { RouterModule,Routes} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateRoutineComponent } from './routines/create-routine/create-routine.component';
import { ListRoutineComponent } from './routines/list-routine/list-routine.component';
import { ProfileAthleteComponent } from './profile/profile-athlete/profile-athlete.component';
import { ProfileTrainerComponent } from './profile/profile-trainer/profile-trainer.component';
import { CreateControlComponent } from './controls/create-control/create-control.component';
import { ListControlsComponent } from './controls/list-controls/list-controls.component';
                    

const pagesRoutes:Routes =[
    {
        path:'dashboard',
        component:DashboardComponent,
        data:{titulo:'Dashboard'}
    },
    {
        path:'create-routine',
        component: CreateRoutineComponent
    },
    {
        path:'routines',
        component: ListRoutineComponent
    },
    {
        path:'profile-athlete',
        component: ProfileAthleteComponent
    },
    {
        path:'profile-trainer',
        component: ProfileTrainerComponent
    },
    {
        path: 'create-control',
        component: CreateControlComponent
    },
    {
        path: 'controls',
        component: ListControlsComponent
    },
    {path:'',redirectTo:('dashboard'),pathMatch:'full'},
];

export const PAGES_ROUTES=RouterModule.forChild(pagesRoutes);