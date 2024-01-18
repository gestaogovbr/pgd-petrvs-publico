import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeederService {
  private apiUrl = 'http://localhost/api';

  constructor(private http: HttpClient) { }

  getSeeders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/seeders`);
  }

  executeSeeder(seederName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/seeder-execute`, { seeder: seederName });
  }
  
}