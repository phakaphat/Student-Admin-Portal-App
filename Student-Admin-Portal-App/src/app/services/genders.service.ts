import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GendersService {

  baseUrl = 'https://dev.tks.co.th/studentapi/Genders/'
  constructor(private http: HttpClient) { }

  getGenders(): Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
