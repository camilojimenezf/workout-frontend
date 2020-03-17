import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../../services/trainer/trainer.service';
import { infoUser, TrainerData } from '../../../models/interfaces';
import { UserService } from '../../../services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from '../../../services/interfaz/ui.service';

@Component({
  selector: 'app-profile-trainer',
  templateUrl: './profile-trainer.component.html',
  styles: []
})
export class ProfileTrainerComponent implements OnInit {

  private infoUser: infoUser;
  public trainerData: TrainerData;
  form: FormGroup;

  constructor(
    private trainerService: TrainerService,
    private userService: UserService,
    private uiService: UiService
  ) { 
    this.infoUser = this.userService.getInfoUser();
  }

  ngOnInit() {
    this.form = new FormGroup({
      certificado: new FormControl(null, {
          validators: [Validators.required]
      }),
      puntaje: new FormControl(null, {
          validators: [Validators.required]
      }),
      descripcion: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.obtenerEntrenador();
  }

  obtenerEntrenador() {
    this.trainerService.getTrainerByUser(this.infoUser.id).subscribe(
      (trainerData: TrainerData) => {
        this.trainerData = trainerData;
        this.cargarTrainer();
      },
      err => {
        // en caso de error puede ser porque aun no tiene atleta asociado
        this.vincularEntrenadorAUsuario();
      }
    )
  }

  vincularEntrenadorAUsuario() {
    this.trainerService.vincularEntrenadorAUser(this.infoUser.id).subscribe(
      resp => {
        console.log(resp);
      }
    )
  }

  cargarTrainer() {
    this.form.setValue({
      certificado: this.trainerData.certification, 
      puntaje: this.trainerData.score, 
      descripcion: this.trainerData.description,
    }); 
  }

  guardarTrainer() {
    if (this.form.invalid) {
      this.uiService.mostrarMensaje('Error','Ingrese datos válidos', 'error');
      return;
    }
    let trainer = {certification: this.form.value.certificado, score: this.form.value.score, description: this.form.value.descripcion,
      id: this.trainerData.id, user_id: this.trainerData.user_id};

    this.trainerService.updateTrainer(trainer).subscribe( resp => {
      if ( resp ) {
        this.obtenerEntrenador();
      }
    }); 
  }

}
