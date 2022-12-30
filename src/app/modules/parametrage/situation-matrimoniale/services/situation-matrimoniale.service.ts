import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

const apiUri = 'api/v1/situation-matrimoniales';

@Injectable({
  providedIn: 'root'
})
export class SituationMatrimonialeService {

  //apiUri: '/v1/situation-matrimoniale';
  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {

      return this.http.get(`${apiUri}`, params);
  }
}
