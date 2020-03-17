import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../baseUrl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  public baseUrl;

  constructor(
    private http:HttpClient
  ) { 
    this.baseUrl = baseUrl
  }

  getPlans() {
    let url = this.baseUrl + 'plan';
    return this.http.get(url).pipe(
      map((resp:any) => {
        console.log(resp);
        return resp.data;
      })
    )
  }
}
