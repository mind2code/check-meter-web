import { Component, OnDestroy, OnInit } from '@angular/core';
import {LocataireService} from "./services/locataire.service";
import {Locataire} from "./models/locataire.model";
import {Observable, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Personne} from "./models/personne.model";
import {PersonneRequest} from "./requests/PersonneRequest";
import {TypePersonne} from "../parametrage/type-personne/model/type-personne.model";
import {PersonnePhysique} from "./models/personne-physique.model";
import {Genre} from "../parametrage/genres/models/genre.model";
import {Civilite} from "../parametrage/civilites/models/civilite.model";
import {SituationMatrimoniale} from "../parametrage/situation-matrimoniale/models/situation-matrimoniale.model";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { Tenant } from 'src/app/shared/models/tenant.model';
import { TenantPageActions } from 'src/app/store/tenant/tenant.actions';
import * as TenantSelector from 'src/app/store/tenant/tenant.selectors';

@Component({
  selector: 'app-locataires',
  templateUrl: './locataires.component.html',
  styleUrls: ['./locataires.component.scss']
})
export class LocatairesComponent implements OnInit, OnDestroy {

  tenants$: Observable<Tenant[]>;

  locataires$: Locataire[];
  currentLocataire = null;
  currentIndex = -1;
  title = '';

  page = 0;
  totalRecords: Observable<number>;
  pageSize: number = pagination.perPage ?? 25;
  paginationQuery: PaginationQuery = {};

  subscriptions: Array<Subscription> = [];

  constructor(
    private locataireService: LocataireService,
    private toastr: ToastrService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.tenants$ = this.store.select(TenantSelector.selectAll);
    this.totalRecords = this.store.select(TenantSelector.selectTotalRecords);
    this.refreshList();
    // this.retrieveLocatires();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  trackById(index: number, item: Tenant): string {
    return item.id;
  }

  refreshList() {
    this.paginationQuery.page = this.page - 1;
    if (this.paginationQuery.page < 0) this.paginationQuery.page = 0;
    this.paginationQuery.size = this.pageSize;
    this.store.dispatch(TenantPageActions.loadAll({ params: this.paginationQuery }));
  }

  retrieveLocatires(): void {
    const params = {};

    this.locataireService.getAll(params).subscribe(
      res => {
        const { data, recordsTotal } = res;
        //this.locataires = data;
        this.locataires$ = data;
        //console.log(this.locataires);
      }, error => {
        console.log('echec transaction', error.message);
        this.toastr.error(error.message, 'Echec' , {
          positionClass: 'toast-bottom-right'
        });
      }
    )
  }

  create(): void {
    const request = new PersonneRequest();
    request.typePersonne = new TypePersonne();
    request.typePersonne.id = 1;
    request.typePersonne.identifiant = 'PP';
    request.personnePhysique = new PersonnePhysique();
    request.personnePhysique.nom = 'ETIEN';
    request.personnePhysique.prenoms = 'Romuald';
    request.personnePhysique.nomJeuneFille = '';
    request.personnePhysique.dateNaissance = new Date();
    request.personnePhysique.lieuNaissance = 'Abidjan';
    request.personnePhysique.nomComplet = request.personnePhysique.nom + ' ' + request.personnePhysique.prenoms;
    request.personnePhysique.genre = new Genre();
    request.personnePhysique.genre.id = 1;
    request.personnePhysique.civilite = new Civilite();
    request.personnePhysique.civilite.id = 1;
    request.personnePhysique.situationMatrimoniale = new SituationMatrimoniale();
    request.personnePhysique.situationMatrimoniale.id = 1;
    request.personnePhysique.identifiant = 'P000011';

    this.locataireService.create(request).subscribe(res => {
      console.log(JSON.stringify(res));
    });
  }

  handlePageChange(event: any): void {
    this.page = event;
    this.retrieveLocatires();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveLocatires();
  }


}
