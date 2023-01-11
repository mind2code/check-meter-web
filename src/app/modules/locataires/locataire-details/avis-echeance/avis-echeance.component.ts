import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AvisEncaisserComponent} from "./avis-encaisser/avis-encaisser.component";
import { AvisEcheance } from '../../models/avis-echeance.model';
import { AvisEcheanceService } from './services/avis-echeance.service';

@Component({
  selector: 'app-avis-echeance',
  templateUrl: './avis-echeance.component.html',
  styleUrls: ['./avis-echeance.component.scss']
})
export class AvisEcheanceComponent implements OnInit {

  avisEcheances$: AvisEcheance[];
  currentAvisEcheance = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  bsModalRef: BsModalRef;
  constructor(private bsModalService: BsModalService, private service: AvisEcheanceService) { }

  ngOnInit(): void {
    this.loadAll()
  }

  trackByAvisEcheances(index: number, item: AvisEcheance): string {
    return item.id;
  }

  getRequestParams(searchTitle?: string, page?: number, pageSize?: number): any {
    // tslint:disable-next-line:prefer-const
    let params = {} as any;

    if (searchTitle) {
      // @ts-ignore
      params[`title`] = searchTitle;
    }

    if (page) {
      // @ts-ignore
      params[`page`] = page - 1;
    } else {
      params[`page`] = 0
    }

    if (pageSize) {
      // @ts-ignore
      params[`size`] = pageSize;
    } else {
      params[`size`] = 25
    }

    return params;
  }

  loadAll(): void {
    const params = this.getRequestParams();

    this.service.getAll(params).subscribe({
      next: (response) => {
        console.log('[avis-echeance][getAll][success][response]', response);
        if (response) {
          const { data, recordsTotal } = response;
          this.avisEcheances$ = data;
          this.count = recordsTotal;
        }
      },
      error: (error) => {
        console.error('[avis-echeance][getAll]', error);
      }
    });
  }

  encaisser() {
      this.bsModalRef = this.bsModalService.show(AvisEncaisserComponent);
      this.bsModalRef.content.event.subscribe((res: string) => {
        if(res === 'OK') {
          console.log('Encaissement effectué')
        }
      })
  }

}
