import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { PaginationQuery } from '../requests/pagination.query';
import {environment, pagination} from 'src/environments/environment';
import { ApiOneResponse, ApiPaginatedResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  basePath: string = environment.apiUrl + 'api/v1/personnes';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<ApiPaginatedResponse<Person>> {
    return this.http.get<any>(this.basePath, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }

  getOneById(id: string): Observable<Person> {
    return this.http.get<any>(this.basePath + '/' + String(id));
  }

  create(data: any): Observable<Person> {
    return this.http.post<any>(this.basePath, data);
  }
}
