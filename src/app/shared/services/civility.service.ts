import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginationQuery } from '../requests/pagination.query';
import { Civility } from '../models/person.model';
import { pagination } from 'src/environments/environment';
import { ApiPaginatedResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CivilityService {
  basePath: string = 'api/v1/civilites';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<ApiPaginatedResponse<Civility>> {
    return this.http.get<any>(this.basePath, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }
}
