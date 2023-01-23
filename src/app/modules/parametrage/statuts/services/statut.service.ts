import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatutService {

  apiUri: 'api/v1/genres';
  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
      return this.http.get(`${this.apiUri}`, params);
  }
}
