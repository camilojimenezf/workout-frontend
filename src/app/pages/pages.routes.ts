import { RouterModule,Routes} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateRoutineComponent } from './routines/create-routine/create-routine.component';
import { ListRoutineComponent } from './routines/list-routine/list-routine.component';
import { ProfileAthleteComponent } from './profile/profile-athlete/profile-athlete.component';
import { ProfileTrainerComponent } from './profile/profile-trainer/profile-trainer.component';
import { CreateControlComponent } from './controls/create-control/create-control.component';
import { ListControlsComponent } from './controls/list-controls/list-controls.component';
import { PlanificationComponent } from './planification/planification.component';
import { TrainersComponent } from './trainers/trainers.component';
import { AthletesComponent } from './athletes/athletes.component';
import { CreateTrainingComponent } from './training/create-training/create-training.component';
import { ListTrainingsComponent } from './training/list-trainings/list-trainings.component';
import { PlanesComponent } from './planes/planes.component';
                    

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
        path:'create-routine/:id',
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
    {
        path: 'planification',
        component: PlanificationComponent
    },
    {
        path: 'trainers',
        component: TrainersComponent
    },
    {
        path: 'athletes',
        component: AthletesComponent
    },
    {
        path:'create-training',
        component: CreateTrainingComponent
    },
    {
        path:'trainings',
        component: ListTrainingsComponent
    },
    {
        path:'plans',
        component: PlanesComponent
    },
    {path:'',redirectTo:('dashboard'),pathMatch:'full'},
];

export const PAGES_ROUTES=RouterModule.forChild(pagesRoutes);