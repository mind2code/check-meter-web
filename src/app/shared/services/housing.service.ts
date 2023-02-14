import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Housing } from '../models/housing.model';
import { PaginationQuery } from '../requests/pagination.query';
import { pagination } from 'src/environments/environment';
import { ApiPaginatedResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  basePath: string = 'api/v1/habitations';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<ApiPaginatedResponse<Housing>> {
    return this.http.get<any>(this.basePath, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }

  getOneById(id: string): Observable<Housing> {
    return this.http.get<any>(this.basePath + '/' + String(id));
  }
}