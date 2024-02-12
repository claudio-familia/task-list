import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from 'src/environments/environment';
import { Tasklist } from 'src/app/models/tasklist.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${ENVIRONMENT.ApiUrl}/TaskList`;
  }

  getAll(): Observable<Tasklist[]> {
    return this.http.get<Tasklist[]>(this.apiUrl);
  }

  getById(id: number): Observable<Tasklist> {
    return this.http.get<Tasklist>(`${this.apiUrl}/${id}`);
  }

  create(data: Tasklist): Observable<Tasklist> {
    return this.http.post<Tasklist>(this.apiUrl, data);
  }

  update(data: Tasklist): Observable<Tasklist> {
    return this.http.put<Tasklist>(this.apiUrl, data);
  }
  
  delete(id: number): Observable<Tasklist> {
    return this.http.delete<Tasklist>(`${this.apiUrl}/${id}`);
  }
}
