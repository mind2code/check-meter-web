import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HousingType } from '../models/housing.model';
import { PaginationQuery } from '../requests/pagination.query';
import { pagination } from 'src/environments/environment';
import { ApiPaginatedResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingTypeService {
  basePath: string = 'api/v1/type-habitations';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<ApiPaginatedResponse<HousingType>> {
    return this.http.get<any>(this.basePath, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }
}
