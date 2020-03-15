import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Profile } from '../../../models/profile';
import { AthleteData, infoUser } from '../../../models/interfaces';
import { AthleteService } from '../../../services/athlete/athlete.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-create-control',
  templateUrl: './create-control.component.html',
  styles: []
})
export class CreateControlComponent implements OnInit {

  form: FormGroup;
  private infoUser: infoUser;
  public atleteData: AthleteData;
  public profile:Profile;

  constructor(
    private athleteService: AthleteService,
    private userService: UserService
  ) { 
    this.infoUser = this.userService.getInfoUser();
  }

  ngOnInit() {
    this.form = new FormGroup({
      peso: new FormControl(null, {
          validators: [Validators.required, Validators.min(0)]
      }),
      estatura: new FormControl(null, {
          validators: [Validators.required, Validators.min(0)]
      }),
      grasaCorporal: new FormControl(null, {
        validators: [Validators.required, Validators.min(0)]
      }),
    });

    this.obtenerAtleta();
  }

  obtenerAtleta() {
    this.athleteService.getAthleteByUser(this.infoUser.id).subscribe(
      athleteData => {
        console.log(athleteData);
        this.atleteData = athleteData
      },
      err => {
        // en caso de error puede ser porque aun no tiene atleta asociado
        this.vincularAtletaAUsuario();
      }
    )
  }

  guardarProfile() {
 
    let profile:Profile = new Profile(this.atleteData.id,this.form.value.peso, this.form.value.estatura,
      this.form.value.grasaCorporal);

    this.athleteService.crearProfile(profile).subscribe( resp => {
      console.log(resp);
    })

    this.form.reset();
  }

  vincularAtletaAUsuario() {
    this.athleteService.vincularAtletaAUser(this.infoUser.id).subscribe(
      athleteData => {
        this.atleteData = athleteData;
      }
    )
  }

}
