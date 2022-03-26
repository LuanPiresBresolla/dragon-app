import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDragon } from './dragons-list/dragons-list.component';

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

  putDragonById<T = any>(dragon: IDragon) {
    return this.http.put<T>(this.endPoint + `dragon/${dragon.id}`, dragon);
  }

  postDragon<T = any>(dragon: IDragon) {
    return this.http.post<T>(this.endPoint + `dragon`, dragon);
  }

  deleteDragonById<T = any>(id: string) {
    return this.http.delete<T>(this.endPoint + `dragon/${id}`);
  }
}
