import { Component, OnInit } from '@angular/core';
import { AthleteService } from '../../services/athlete/athlete.service';
import { Athlete } from '../../models/athlete';
import Swal from 'sweetalert2';
import { UiService } from '../../services/interfaz/ui.service';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.css']
})
export class AthletesComponent implements OnInit {

  public athletes: Athlete[];

  constructor(
    private athleteService: AthleteService,
    private uiService:UiService
  ) { }

  ngOnInit() {
    this.obtenerAtletas();
  }

  obtenerAtletas() {
    this.athleteService.getAthletes().subscribe( (athletes:Athlete[]) => {
      console.log(athletes);
      this.athletes = athletes;
    })
  }

  enviarMensaje(athlete: Athlete) {
    Swal.fire({
      title: `Enviale un mensaje a ${athlete.athleteName}`,
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
        this.uiService.mostrarMensaje(`Mensaje enviado a ${athlete.athleteName}`, 'Su mensaje se ha enviado correctamente', 'success');
      }
    })
  }

}
