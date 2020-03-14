import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  obtenerUsers() {
    let url = 'http://localhost:8080/workout/public/users/';

    return this.http.get(url);
  }

  crearUser(user: User) {
    let url = 'http://localhost:8080/workout/public/users/';
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, user, {headers: headers});
  }
}
