import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GendersService {

  baseUrl = 'http://localhost:3000/Genders/'
  constructor(private http: HttpClient) { }

  getGenders(): Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
