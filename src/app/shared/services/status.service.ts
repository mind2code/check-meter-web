import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginationQuery } from '../requests/pagination.query';
import { Status } from '../models/commons.model';
import { pagination } from 'src/environments/environment';
import { ApiPaginatedResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  basePath: string = 'api/v1/statuts';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<ApiPaginatedResponse<Status>> {
    return this.http.get<ApiPaginatedResponse<Status>>(this.basePath + '/all', {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }
}
