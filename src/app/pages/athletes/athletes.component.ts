import { Component, OnInit } from '@angular/core';
import { AthleteService } from '../../services/athlete/athlete.service';
import { Athlete } from '../../models/athlete';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.css']
})
export class AthletesComponent implements OnInit {

  public athletes: Athlete[];

  constructor(private athleteService: AthleteService) { }

  ngOnInit() {
    this.obtenerAtletas();
  }

  obtenerAtletas() {
    this.athleteService.getAthletes().subscribe( (athletes:Athlete[]) => {
      console.log(athletes);
      this.athletes = athletes;
    })
  }

}
