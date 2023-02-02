import {Component, EventEmitter, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Params, Routes} from "@angular/router";
import {LocataireService} from "../services/locataire.service";
import {Personne} from "../models/personne.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AvisEncaisserComponent} from "./avis-echeance/avis-encaisser/avis-encaisser.component";
import {PersonneDetailsComponent} from "./personne-details/personne-details.component";
import {Locataire} from "../models/locataire.model";

@Component({
  selector: 'app-locataire-details',
  templateUrl: './locataire-details.component.html',
  styleUrls: ['./locataire-details.component.scss'],
})
export class LocataireDetailsComponent implements OnInit {

  locataireId: string;
  locataire: Personne;
  demo: string = 'Hello world';
  detailPersonneForm: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  modalRef?: BsModalRef;
  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private bsModalService: BsModalService,
              private locataireService: LocataireService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        // console.log(params['id']);
        this.locataireId = params.id;
        //localStorage.setItem('employeId',this.locataireId)
        this.locataireService.getById(this.locataireId).subscribe(res => {
          const { data, recordsTotal } = res;
          this.locataire = data.personne;
          this.loadDetailsPersonne(this.locataire);
          console.log(this.locataire);
        })
      }
    );

    this.detailPersonneForm = this.fb.group({
      nom: [''],
      prenoms: [''],
      nomJeuneFille: [''],
      dateNaissance: [],
      lieuNaissance: [],
      observation: ['']
    });
  }

  get f() {
    return this.detailPersonneForm.getRawValue();
  }

  loadDetailsPersonne(locataire: Personne) {
    this.detailPersonneForm.patchValue({
      nom: locataire.nom,
      prenoms: locataire.prenoms
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

}
