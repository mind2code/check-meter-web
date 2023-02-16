import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginationQuery } from '../requests/pagination.query';
import { IdentityDocumentType } from '../models/identity-document.model';
import { pagination } from 'src/environments/environment';
import { ApiPaginatedResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class IdentityDocumentTypeService {
  basePath: string = 'api/v1/type_piece_identites';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<ApiPaginatedResponse<IdentityDocumentType>> {
    return this.http.get<ApiPaginatedResponse<IdentityDocumentType>>(this.basePath, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      },
    });
  }
}
