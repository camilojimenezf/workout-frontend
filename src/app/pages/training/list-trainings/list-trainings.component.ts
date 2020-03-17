import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { infoUser } from '../../../models/interfaces';
import { TrainingService } from '../../../services/training/training.service';
import { Training } from 'src/app/models/training';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-trainings',
  templateUrl: './list-trainings.component.html',
  styleUrls: ['./list-trainings.component.css']
})
export class ListTrainingsComponent implements OnInit {

  private infoUser: infoUser;
  public trainings: Training[];

  constructor(
    private userService: UserService,
    private trainingService: TrainingService
  ) { 
    this.infoUser = this.userService.getInfoUser();
  }

  ngOnInit() {
    this.obtenerEntrenamientos();
  }

  obtenerEntrenamientos(){
    this.trainingService.getTrainingsByUser(this.infoUser.id).subscribe( (trainings: Training[])=> {
        this.trainings = trainings;
    })
  }

  eliminarEntrenamiento(id) {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar este entrenamiento?',
      text: "Este cambio no puede ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.trainingService.deleteTraining(id).subscribe( resp => {
          console.log(resp);
          Swal.fire(
            'Eliminado!',
            'El entrenamiento ha sido eliminado',
            'success'
          )
          this.obtenerEntrenamientos();
        })
      }
    })
  }

}
