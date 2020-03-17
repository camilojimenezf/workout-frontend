import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../services/trainer/trainer.service';
import { Trainer } from '../../models/trainer';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  public trainers: Trainer[] = [];

  constructor(
    private trainerService: TrainerService
  ) { }

  ngOnInit() {
    this.obtenerTrainers();
  }

  obtenerTrainers() {
    this.trainerService.obtenerUsers().subscribe((trainers:Trainer[]) => {
      console.log(trainers);
      this.trainers = trainers;
      console.log(this.trainers);
    })
  }

}
