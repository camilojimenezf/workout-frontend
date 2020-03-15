import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UiService } from '../interfaz/ui.service';
import { infoUser } from '../../models/interfaces';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string;
  private token: string;
  private role: string;
  private infoUser: infoUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private uiService: UiService) { 
      this.baseUrl = baseUrl;
      this.obtenerSesionStorage();
    }

  obtenerSesionStorage() {
    this.token = localStorage.getItem('token');
    this.role = localStorage.getItem('role');
    this.infoUser = JSON.parse(localStorage.getItem('infoUser'));
  }

  obtenerUsers() {
    let url = this.baseUrl + 'users';
    return this.http.get(url);
  }

  login(data, recuerdame = false) {
    let url = this.baseUrl + 'login';
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    let loginData = JSON.stringify({...data});
    let params = 'json='+loginData;

    return this.http.post(url, params, {headers: headers}).pipe(
      map( (resp:any) => {
        console.log(resp);
        if (recuerdame) {
          localStorage.setItem('email', data.email);
        } else {
          localStorage.removeItem('email');
        }
        localStorage.setItem('token', resp[0]);
        localStorage.setItem('role', resp[1].role);
        localStorage.setItem('infoUser', JSON.stringify(resp[1]));
        this.infoUser = resp[1];
        this.token = resp[0];
        this.role = resp[1].role;
        this.router.navigate(['/panel']);
        return true;
      }),
      catchError(err => {
        console.log(err);
        throw err;
      })
    )
  }

  getUser(id) {
    let url = this.baseUrl + 'users/'+id;
    let headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.get(url, {headers}).pipe(
      map( (resp:any) => {
        console.log(resp);
        return resp.data;
      }),
      catchError( err => {
        throw err;
      })
    )
  }

  crearUser(user: User) {
    let url = this.baseUrl + 'users';
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Authorization', this.token);

    let userData = JSON.stringify({...user});
    let params = 'json='+userData;

    return this.http.post(url, params, {headers: headers}).pipe(
      map( resp => {
        console.log(resp);
        // Ahora debe iniciar sesión
        this.uiService.mostrarMensaje('Cuenta creada!', 'Ya puedes iniciar sesión en workout', 'success')
        this.router.navigate(['/login']);
      }),
      catchError(err => {
        console.log(err);
        throw err;
      })
    );
  }

  updateUser(id, user:User) {
    let url = this.baseUrl + 'users/'+id;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Authorization', this.token);

    let userData = JSON.stringify({...user});
    let params = 'json='+userData;

    return this.http.put(url, params, {headers: headers}).pipe(
      map( (resp:any) => {
        if( resp.code && resp.code >= 400) {
          this.uiService.mostrarMensaje('Error', resp.error, 'error');
          return false;
        }
        this.uiService.mostrarMensaje('Usuario actualizado', 'sus datos han sido actualizado con éxito', 'success');
        return true;
      }),
      catchError(err => {
        throw err;
      })
    )
  }

  getToken() {
    return this.token;
  }

  getRole() {
    return this.role;
  }

  getInfoUser() {
    return {...this.infoUser};
  }
}
