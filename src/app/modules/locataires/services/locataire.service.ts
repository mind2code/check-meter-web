import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Locataire} from "../models/locataire.model";
import {Personne} from "../models/personne.model";
import {PersonneRequest} from "../requests/PersonneRequest";

@Injectable({
  providedIn: 'root'
})
export class LocataireService {

  basePath: string = 'api/v1/locataires';
  basePathPersonne: string = '/personnes';

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.basePath, params);
  }

  create(personneRequest: PersonneRequest): Observable<any> {
    return this.http.post(environment.apiUrl + this.basePathPersonne, personneRequest);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(this.basePath + `/${id}`);
  }

  /* search(request: any): Observable<any>{

  } */
}
