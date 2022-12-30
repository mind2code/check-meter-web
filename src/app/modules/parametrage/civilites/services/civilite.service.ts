import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

const apiUri = 'api/v1/civilites';

@Injectable({
  providedIn: 'root'
})
export class CiviliteService {

  //apiUri: 'api/v1/civilites';
  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {

      return this.http.get(`${apiUri}`, params);
  }
}
