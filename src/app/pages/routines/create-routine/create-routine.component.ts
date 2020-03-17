import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../../services/trainer/trainer.service';
import { UserService } from '../../../services/user/user.service';
import { infoUser } from '../../../models/interfaces';
import { Trainer } from '../../../models/trainer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from '../../../services/interfaz/ui.service';
import { RoutineService } from '../../../services/routine/routine.service';
import { Routine } from '../../../models/routine';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styles: []
})
export class CreateRoutineComponent implements OnInit {

  private infoUser: infoUser;
  private trainerId: number;
  private routineId: number;
  public mode: string;
  form: FormGroup;

  constructor(
    private trainerService: TrainerService,
    private userService: UserService,
    private uiService: UiService,
    private routineService: RoutineService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.infoUser = this.userService.getInfoUser();
    this.mode = 'CREAR';
  }

  ngOnInit() {
    this.form = new FormGroup({
      titulo: new FormControl(null, {
          validators: [Validators.required]
      }),
      descripcion: new FormControl(null, {
          validators: [Validators.required]
      }),
      duracion: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)]
      }),
      frecuencia: new FormControl(null, {
        validators: [Validators.required, Validators.min(1), Validators.max(7)]
      }),
      objetivo: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.obtenerEntrenador();
    this.obtenerParams();
  }

  obtenerParams() {
    this.route.params.subscribe( (params:any) => {
      console.log(params);
      if (params.id) {
        this.obtenerRutina(params.id);
        this.routineId = params.id;
      }
    })
  }

  obtenerRutina(id) {
    this.routineService.getRoutine(id).subscribe( (routine:Routine) => {
      this.cargarRutina(routine);
      this.mode = 'EDITAR';
    })
  }

  obtenerEntrenador() {
    this.trainerService.getTrainerByUser(this.infoUser.id).subscribe( (trainer: Trainer) => {
      this.trainerId = trainer.id;
    })
  }

  cargarRutina(rutina: Routine) {
    this.form.setValue({
      titulo: rutina.title, 
      descripcion: rutina.description, 
      duracion: rutina.duration,
      frecuencia: rutina.frequency,
      objetivo: rutina.goal,
    });  
  }

  guardarRutina() {
    if (this.form.invalid) {
      this.uiService.mostrarMensaje('Error','Ingrese datos válidos', 'error');
      return;
    }
    let routine: Routine = {title: this.form.value.titulo, description: this.form.value.descripcion, duration: this.form.value.duracion,
      frequency: this.form.value.frecuencia, goal: this.form.value.objetivo, trainer_id: this.trainerId};

    if (this.mode === 'CREAR') {
      this.routineService.createRoutine(routine).subscribe( resp => {
        if ( resp ) {
          this.router.navigate(['/panel/routines']);
          this.form.reset();
        }
      });  
    } else {
      routine.id = this.routineId;
      this.routineService.updateRoutine(routine).subscribe( resp => {
        this.router.navigate(['/panel/routines']);
        this.form.reset();
      })
    }
  }

}
