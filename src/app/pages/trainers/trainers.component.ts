import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../services/trainer/trainer.service';
import { Trainer } from '../../models/trainer';
import Swal from 'sweetalert2';
import { UiService } from '../../services/interfaz/ui.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  public trainers: Trainer[] = [];

  constructor(
    private trainerService: TrainerService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.obtenerTrainers();
  }

  obtenerTrainers() {
    this.trainerService.getTrainers().subscribe((trainers:Trainer[]) => {
      console.log(trainers);
      this.trainers = trainers;
      console.log(this.trainers);
    })
  }

  enviarMensaje(trainer: Trainer) {
    Swal.fire({
      title: `Enviale un mensaje a ${trainer.trainerName}`,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar mensaje',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return new Promise((resolve, reject) => {
            setTimeout( () => {
                resolve(true);
            },2000)
          })
          .then(response => {
            return "Mensaje enviado!";
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        this.uiService.mostrarMensaje(`Mensaje enviado a ${trainer.trainerName}`, 'Su mensaje se ha enviado correctamente', 'success');
      }
    })
  }

}
