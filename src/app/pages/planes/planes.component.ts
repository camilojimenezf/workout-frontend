import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan/plan.service';
import { Plan } from '../../models/plan';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  public plans: Plan[];
  constructor(
    private planService: PlanService
  ) { }

  ngOnInit() {
    this.obtenerPlanes();
  }

  obtenerPlanes() {
    this.planService.getPlans().subscribe(
      (plans: Plan[])=> {
        console.log(plans);
        this.plans = plans;
      }
    )
  }

}
