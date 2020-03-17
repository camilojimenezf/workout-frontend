import { Injectable } from '@angular/core';
import { baseUrl } from '../baseUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { TrainerData } from '../../models/interfaces';
import { UiService } from '../interfaz/ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private baseUrl: string;
  private token: string;

  constructor( 
    private http: HttpClient,
    private userService: UserService,
    private uiService: UiService
  ) { 
    this.baseUrl = baseUrl;
    this.token = this.userService.getToken();
  }

  getTrainers() {
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

  getTrainerByUser(userId) {
    let url = this.baseUrl + `users/${userId}/trainers`;
    let headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.get(url, {headers}).pipe(
      map( (resp) => {
        return resp;
      }),
      catchError( err => {
        console.log(err);
        throw err;
      })
    );
  }

  vincularEntrenadorAUser(userId) {
    let url = this.baseUrl + `users/${userId}/trainers`;
    let headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.post(url, {headers}).pipe(
      map( (resp: any) => {
        console.log(resp);
        return resp.data;
      }),
      catchError( err => {
        console.log(err);
        throw err;
      })
    );
  }

  updateTrainer(trainer: TrainerData) {
    let url = this.baseUrl + `trainers/`+ trainer.id;
    let headers = new HttpHeaders().set('Authorization', this.token)
    .set('Content-Type', 'application/x-www-form-urlencoded');

    let trainerData = JSON.stringify({...trainer});
    let params = 'json='+trainerData;
    
    return this.http.put(url, params, {headers}).pipe(
      map( (resp: any) => {
        this.uiService.mostrarMensaje('Rutina creada', 'su rutina ha sido creada de manera éxitosa', 'success');
        return resp.data;
      }),
      catchError( err => {
        throw err;
      })
    );
  }

}
