import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DragonService {

  private endPoint = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getDragons<T = any>() {
    return this.http.get<T>(this.endPoint + `dragon`);
  }

  getDragonById<T = any>(id: string) {
    return this.http.get<T>(this.endPoint + `dragon/${id}`);
  }
}
