import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { RoutineService } from '../../../services/routine/routine.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { infoUser } from '../../../models/interfaces';
import { Routine } from '../../../models/routine';
import { Training } from '../../../models/training';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from '../../../services/interfaz/ui.service';
import { TrainingService } from '../../../services/training/training.service';

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {

  public mode: string;
  private infoUser: infoUser;
  form: FormGroup;
  private routineId: number;
  private trainingId: number;

  public routines: Routine[];

  constructor(
    private userService: UserService,
    private routineService: RoutineService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService,
    private trainingService: TrainingService
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
      })
    });
    this.obtenerRutinasUser();
  }

  obtenerRutinasUser() {
    this.routineService.getRoutinesByUser(this.infoUser.id).subscribe( (routines:Routine[]) => {
      this.routines = routines;
    })
  }

  cargarEntrenamiento(entrenamiento: Training) {
    this.form.setValue({
      titulo: entrenamiento.title, 
      descripcion: entrenamiento.description, 
      duracion: entrenamiento.duration,
    });  
  }

  changeRoutine(event) {
    console.log(event);
    this.routineId = event.target.value;
  }

  guardarEntrenamiento() {
    if (this.form.invalid) {
      this.uiService.mostrarMensaje('Error','Ingrese datos válidos', 'error');
      return;
    }
    if (!this.routineId) {
      this.uiService.mostrarMensaje('Error','Ingrese una rutina asociada', 'error');
      return;
    }
    let training: Training = {title: this.form.value.titulo, description: this.form.value.descripcion, duration: this.form.value.duracion};

    if (this.mode === 'CREAR') {
      this.trainingService.createTraining(training, this.routineId).subscribe( resp => {
        if ( resp ) {
          this.router.navigate(['/panel/trainings']);
          this.form.reset();
        }
      });  
    } else {
      training.id = this.trainingId;
      /* this.routineService.updateRoutine(routine).subscribe( resp => {
        this.router.navigate(['/panel/routines']);
        this.form.reset();
      }) */
    } 
  }

}
