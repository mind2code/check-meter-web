import { Component, OnInit } from '@angular/core';
import {AvisEncaisserComponent} from "./avis-encaisser/avis-encaisser.component";
import { AvisEcheance } from '../../models/avis-echeance.model';
import { AvisEcheanceService } from '../../services/avis-echeance.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AvisEcheancesActions } from '../../store/actions/avis-echeances.actions';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';

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

  bsOffcanvasRef: NgbOffcanvasRef;
  test$: Observable<AvisEcheance|undefined>;
  constructor(
    private bsOffcanvasService: NgbOffcanvas,
    private service: AvisEcheanceService,
    private store: Store
  ) {
  }

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

  encaisser(id: string) {
    const selected = this.avisEcheances$.find((a) => a.id === id);
    this.store.dispatch(AvisEcheancesActions.setSelected({ selected }));
    this.bsOffcanvasRef = this.bsOffcanvasService.open(AvisEncaisserComponent, {
      backdrop: 'static',
      position: 'end',
    });
    this.bsOffcanvasRef.result.then((reason) => {
      console.log('*** Offcanvas close reason ->', reason); // TODO: Remove
      if (reason === 'success') {
        console.log('*** Offcanvas "success" reason. avis-echeanche loading ...'); // TODO: Remove
        this.loadAll();
      }
    }).catch((reason) => {
      console.log('*** Offcanvas dismiss reason', reason); // TODO: Remove
    });
  }

}
