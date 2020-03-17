import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { infoUser } from '../../models/interfaces';
import { baseUrl } from '../baseUrl';
import { map } from 'rxjs/operators';
import { Routine } from '../../models/routine';
import { UiService } from '../interfaz/ui.service';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private infoUser: infoUser;
  private token:string;
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private uiService: UiService
  ) { 
    this.infoUser = this.userService.getInfoUser();
    this.baseUrl = baseUrl;
    this.token = this.userService.getToken();
  }

  getRoutinesByUser(userId) {
    let url = this.baseUrl + `users/${userId}/routines`;
    let headers = new HttpHeaders().set('Authorization', this.token);  

    return this.http.get(url, {headers}).pipe(
      map((resp:any) => {
        console.log(resp);
        return resp.data[0].routines;
      })
    )
  }

  getRoutine(id) {
    let url = this.baseUrl + `routines/${id}`;
    let headers = new HttpHeaders().set('Authorization', this.token);  

    return this.http.get(url, {headers}).pipe(
      map((resp:any) => {
        console.log(resp);
        return resp.data;
      })
    )
  }

  createRoutine(routine: Routine) {
    let url = this.baseUrl + `routines`;
    let headers = new HttpHeaders().set('Authorization', this.token)
    .set('Content-Type', 'application/x-www-form-urlencoded');  
    
    let routineData = JSON.stringify({...routine});
    let params = 'json='+routineData;

    return this.http.post(url, params, {headers}).pipe(
      map((resp:any) => {
        console.log(resp);
        this.uiService.mostrarMensaje('Rutina creada', 'su rutina fue creada exitosamente', 'success');
        return resp;
      })
    )
  }

  updateRoutine(routine: Routine) {
    let url = this.baseUrl + `routines/${routine.id}`;
    let headers = new HttpHeaders().set('Authorization', this.token)
    .set('Content-Type', 'application/x-www-form-urlencoded');  
    
    let routineData = JSON.stringify({...routine});
    let params = 'json='+routineData;

    return this.http.put(url, params, {headers}).pipe(
      map((resp:any) => {
        console.log(resp);
        this.uiService.mostrarMensaje('Rutina editada', 'su rutina fue editada exitosamente', 'success');
        return resp;
      })
    )
  }

  deleteRoutine(id) {
    let url = this.baseUrl + `routines/${id}`;
    let headers = new HttpHeaders().set('Authorization', this.token)
    .set('Content-Type', 'application/x-www-form-urlencoded'); 
    
    return this.http.delete(url, {headers}).pipe(
      map((resp:any) => {
        console.log(resp);
        return true;
      })
    )
  }
}
