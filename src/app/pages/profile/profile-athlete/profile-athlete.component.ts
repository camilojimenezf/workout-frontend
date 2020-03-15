import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AthleteService } from '../../../services/athlete/athlete.service';
import { UserService } from '../../../services/user/user.service';
import { infoUser, AthleteData } from '../../../models/interfaces';

@Component({
  selector: 'app-profile-athlete',
  templateUrl: './profile-athlete.component.html',
  styles: []
})
export class ProfileAthleteComponent implements OnInit {


  private infoUser: infoUser;
  public atleteData: AthleteData;

  constructor(
    private athleteService: AthleteService,
    private userService: UserService) { 
      this.infoUser = this.userService.getInfoUser();
    }

  ngOnInit() {

    this.obtenerAtleta();
  }

  obtenerAtleta() {
    this.athleteService.getAthleteByUser(this.infoUser.id).subscribe(
      athleteData => {
        this.atleteData = athleteData
      },
      err => {
        // en caso de error puede ser porque aun no tiene atleta asociado
        this.vincularAtletaAUsuario();
      }
    )
  }

  vincularAtletaAUsuario() {
    this.athleteService.vincularAtletaAUser(this.infoUser.id).subscribe(
      athleteData => {
        this.atleteData = athleteData;
      }
    )
  }

}
