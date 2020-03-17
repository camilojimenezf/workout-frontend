import { Injectable } from '@angular/core';
import { baseUrl } from '../baseUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Training } from '../../models/training';
import { UiService } from '../interfaz/ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

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

  createTraining(training: Training, routineId) {
    let url = this.baseUrl + `/routines/${routineId}/trainings`;
    let headers = new HttpHeaders().set('Authorization', this.token)
    .set('Content-Type', 'application/x-www-form-urlencoded');

    let trainingData = JSON.stringify({...training});
    let params = 'json='+trainingData;

    return this.http.post(url, params ,{headers} ).pipe(
      map( resp => {
        console.log(resp);
        this.uiService.mostrarMensaje('Entrenamiento creado!', 'Su entrenamiento fue creado con éxito', 'success');
        return resp;
      })
    )
  }

  getTrainingsByUser(idUser) {
    let url = this.baseUrl + `users/${idUser}/trainings`;
    let headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.get(url, {headers}).pipe(
      map( (resp:any) => {
        console.log(resp);
        const trainings = resp[0].filter( r => { if ( r.trainings && r.trainings.length > 0) return true; })
        return trainings.map(r => r.trainings)[0];
      })
    )
  }

  deleteTraining(id) {
    let url = this.baseUrl + `trainings/${id}`;
    let headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.delete(url, {headers}).pipe(
      map( resp => {
        console.log(resp);
        return resp;
      })
    )
  }


}
