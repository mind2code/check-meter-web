import {Component, Input, OnInit} from '@angular/core';
import {ICreateAccount} from "../../create-locataire.helper";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {Civilite} from "../../../../parametrage/civilites/models/civilite.model";
import {CiviliteService} from "../../../../parametrage/civilites/services/civilite.service";
import {GenreService} from "../../../../parametrage/genres/services/genre.service";
import {Genre} from "../../../../parametrage/genres/models/genre.model";
import {
  SituationMatrimoniale
} from "../../../../parametrage/situation-matrimoniale/models/situation-matrimoniale.model";
import {
  SituationMatrimonialeService
} from "../../../../parametrage/situation-matrimoniale/services/situation-matrimoniale.service";

@Component({
  selector: 'app-create-personne',
  templateUrl: './create-personne.component.html',
  styleUrls: ['./create-personne.component.scss']
})
export class CreatePersonneComponent implements OnInit {

  typePersonne: any;

  title = '';

  page = 1;
  count = 0;
  pageSize = 3;

  civilites: Civilite[];
  genres: Genre[];
  situationMatrimoniales: SituationMatrimoniale[];

  @Input('updateParentModel') updateParentModel: (
    part: Partial<ICreateAccount>,
    isFormValid: boolean
  ) => void;

  personnePhysiqueForm: FormGroup;

  @Input() defaultValues: Partial<ICreateAccount>;
  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private civiliteService: CiviliteService,
              private genreService: GenreService,
              private situationMatrimonialeService: SituationMatrimonialeService) { }

  ngOnInit(): void {
    this.typePersonne = this.defaultValues.typePersonne;

    console.log('default value => ' + JSON.stringify(this.defaultValues));
    this.initForm();
    this.updateParentModel({}, true);
    this.getCivilites();
    this.getGenres();
    this.getSituationMatrimoniale();
  }

  initForm() {
    this.personnePhysiqueForm = this.fb.group({
      civilite: [''],
      nom: [''],
      prenoms: [''],
      nomJeuneFille: [''],
      dateNaissance: [''],
      lieuNaissance: [''],
      genre: [''],
      situationMatrimoniale: ['']
    });

    const formChangesSubscr = this.personnePhysiqueForm.valueChanges.subscribe((val) => {
      console.log('val value => ' + JSON.stringify(val));
      this.updateParentModel(val, true);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  get f() { return this.personnePhysiqueForm.controls; }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      // @ts-ignore
      params[`title`] = searchTitle;
    }

    if (page) {
      // @ts-ignore
      params[`page`] = page - 1;
    }

    if (pageSize) {
      // @ts-ignore
      params[`size`] = pageSize;
    }

    return params;
  }

  getCivilites(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.civiliteService.getAll(params).subscribe(
      res => {
        const { data, recordsTotal } = res;
        //this.locataires = data;
        this.civilites = data;
        this.count = recordsTotal;
        //console.log(this.locataires);
      }, error => {
        console.log('echec transaction', error.message);
        //this.toastr.error(error.message, 'Echec' );
      }
    )
  }
  getGenres(): void {
    const genreParams = this.getRequestParams('', this.page, this.pageSize);

    this.genreService.getAll(genreParams).subscribe(
      res => {
        const { data, recordsTotal } = res;
        //this.locataires = data;
        this.genres = data;
        this.count = recordsTotal;
        //console.log(this.locataires);
      }, error => {
        console.log('echec transaction', error.message);
        //this.toastr.error(error.message, 'Echec' );
      }
    )
  }
  getSituationMatrimoniale(): void {
    const situationParams = this.getRequestParams('', this.page, this.pageSize);

    this.situationMatrimonialeService.getAll(situationParams).subscribe(
      res => {
        const { data, recordsTotal } = res;
        //this.locataires = data;
        this.situationMatrimoniales = data;
        this.count = recordsTotal;
        //console.log(this.locataires);
      }, error => {
        console.log('echec transaction', error.message);
        //this.toastr.error(error.message, 'Echec' );
      }
    )
  }

}
