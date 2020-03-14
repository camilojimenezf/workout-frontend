import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

//RUTAS
import { PAGES_ROUTES } from './pages.routes';

//COMPONENTES
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
    declarations:[
        DashboardComponent,
    ],
    exports:[
        DashboardComponent,
    ],
    imports:[
        CommonModule,
        PAGES_ROUTES,
        SharedModule
    ]
})
export class PagesModule {}