import { Injectable } from '@angular/core';
import { baseUrl } from '../baseUrl';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private baseUrl: string;

  constructor( private http: HttpClient) { 
    this.baseUrl = baseUrl;
  }

  obtenerUsers() {
    let url = this.baseUrl + 'trainers';
    return this.http.get(url).pipe(
      map( (resp:any) => {
        console.log(resp);
        const trainersData = resp.data
        const trainers = trainersData.map( trainer => {
          return  {user_id: trainer.user_id,
                  certification: trainer.certification,
                  score: trainer.score,
                  description: trainer.description,
                  id: trainer.id,
                  trainerName: trainer.user.name,
                  trainerEmail: trainer.user.email,
                  trainerPhone: trainer.user.phone}
        })
        return trainers;
      })
    );
  }
}
