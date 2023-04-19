import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = 'http://localhost:3000/Student/'
  constructor(private http: HttpClient) { }

  postStudent(data: any): Observable<any>{
    return this.http.post(this.baseUrl, data);
  }

  getStudent(): Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
