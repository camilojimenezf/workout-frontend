import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../baseUrl';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { AthleteData } from '../../models/interfaces';
import { Profile } from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  private baseUrl;
  private token;

  constructor(
    private http: HttpClient,
    private userService: UserService) { 
    this.baseUrl = baseUrl;
    this.token = this.userService.getToken();
  }

  getAthleteByUser(userId) {
    let url = this.baseUrl + `users/${userId}/athletes`;
    let headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.get(url, {headers}).pipe(
      map( (athleteData: AthleteData) => {
        return athleteData;
      }),
      catchError( err => {
        console.log(err);
        throw err;
      })
    );
  }

  vincularAtletaAUser(userId) {
    let url = this.baseUrl + `users/${userId}/athletes`;
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

  obtenerPerfilesAtleta(userId) {
    let url = this.baseUrl + `users/${userId}/profiles`;
    let headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.get(url, {headers}).pipe(
      map( (profiles: Profile[]) => {
        console.log(profiles);
        return profiles;
      }),
      catchError( err => {
        console.log(err);
        throw err;
      })
    );
  }

  crearProfile(profile) {
    let url = this.baseUrl + 'profiles';
    let headers = new HttpHeaders().set('Authorization', this.token).set('Content-Type', 'application/x-www-form-urlencoded');

    let profileData = JSON.stringify({...profile});
    let params = 'json='+profileData;

    return this.http.post(url, params,{headers}).pipe(
      map( resp => {
        console.log(resp);
        return resp;
      })
    )
  }
}
