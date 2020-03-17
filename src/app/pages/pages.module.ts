import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

//RUTAS
import { PAGES_ROUTES } from './pages.routes';

//COMPONENTES
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileAthleteComponent } from './profile/profile-athlete/profile-athlete.component';
import { ProfileTrainerComponent } from './profile/profile-trainer/profile-trainer.component';
import { CreateRoutineComponent } from './routines/create-routine/create-routine.component';
import { ListRoutineComponent } from './routines/list-routine/list-routine.component';
import { FormUserComponent } from './profile/form-user/form-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateControlComponent } from './controls/create-control/create-control.component';
import { ListControlsComponent } from './controls/list-controls/list-controls.component';
import { PlanificationComponent } from './planification/planification.component';
import { TrainersComponent } from './trainers/trainers.component';
import { AthletesComponent } from './athletes/athletes.component';




@NgModule({
    declarations:[
        DashboardComponent,
        ProfileAthleteComponent,
        ProfileTrainerComponent,
        CreateRoutineComponent,
        ListRoutineComponent,
        FormUserComponent,
        CreateControlComponent,
        ListControlsComponent,
        PlanificationComponent,
        TrainersComponent,
        AthletesComponent,
    ],
    exports:[
        DashboardComponent,
    ],
    imports:[
        CommonModule,
        PAGES_ROUTES,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class PagesModule {}