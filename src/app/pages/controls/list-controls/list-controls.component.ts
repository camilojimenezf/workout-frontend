import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { infoUser } from '../../../models/interfaces';
import { AthleteService } from '../../../services/athlete/athlete.service';
import { Profile } from '../../../models/profile';

@Component({
  selector: 'app-list-controls',
  templateUrl: './list-controls.component.html',
  styles: []
})
export class ListControlsComponent implements OnInit {

  private infoUser: infoUser;
  public profiles: Profile[] = [];

  constructor(
    private userService: UserService,
    private athleteService: AthleteService
  ) { 
    this.infoUser = this.userService.getInfoUser();
  }

  ngOnInit() {
    this.athleteService.obtenerPerfilesAtleta(this.infoUser.id).subscribe( profiles => {
      this.profiles = profiles;
    })
  }

}
