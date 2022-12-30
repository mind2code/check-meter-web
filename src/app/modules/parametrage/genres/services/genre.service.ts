import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

const apiUri = 'api/v1/genres';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  apiUri: '/v1/genres';
  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {

      return this.http.get(`${apiUri}`, params);
  }
}
