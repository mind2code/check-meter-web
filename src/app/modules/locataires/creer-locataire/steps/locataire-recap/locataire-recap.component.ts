import {Component, Input, OnInit} from '@angular/core';
import {ICreateAccount} from "../../create-locataire.helper";
import {Subscription} from "rxjs";
import {PersonneRequest} from "../../../requests/PersonneRequest";
import {TypePersonne} from "../../../../parametrage/type-personne/model/type-personne.model";
import {PersonnePhysique} from "../../../models/personne-physique.model";
import {Genre} from "../../../../parametrage/genres/models/genre.model";
import {Civilite} from "../../../../parametrage/civilites/models/civilite.model";
import {
  SituationMatrimoniale
} from "../../../../parametrage/situation-matrimoniale/models/situation-matrimoniale.model";
import {LocataireService} from "../../../services/locataire.service";

@Component({
  selector: 'app-locataire-recap',
  templateUrl: './locataire-recap.component.html',
  styleUrls: ['./locataire-recap.component.scss']
})
export class LocataireRecapComponent implements OnInit {

  @Input('updateParentModel') updateParentModel: (
    part: Partial<ICreateAccount>,
    isFormValid: boolean
  ) => void;

  @Input() defaultValues: Partial<ICreateAccount>;
  private unsubscribe: Subscription[] = [];

  constructor(private locataireService: LocataireService) { }

  ngOnInit(): void {
    console.log('account data ' + JSON.stringify(this.defaultValues))
  }

  ngSubmit() {
    const request = new PersonneRequest();
    request.typePersonne = new TypePersonne();
    request.typePersonne.id = 1;
    request.typePersonne.identifiant = 'PP';
    request.personnePhysique = new PersonnePhysique();
    request.personnePhysique.nom = this.defaultValues.nom!;
    request.personnePhysique.prenoms = this.defaultValues.prenoms!;
    request.personnePhysique.nomJeuneFille = this.defaultValues.nomJeuneFille!;
    request.personnePhysique.dateNaissance = new Date(this.defaultValues.dateNaissance!);
    request.personnePhysique.lieuNaissance = this.defaultValues.lieuNaissance!;
    request.personnePhysique.nomComplet = request.personnePhysique.nom + ' ' + request.personnePhysique.prenoms;
    request.personnePhysique.genre = new Genre();
    request.personnePhysique.genre.id = this.defaultValues.genre!;
    request.personnePhysique.civilite = new Civilite();
    request.personnePhysique.civilite.id = this.defaultValues.civilite!;
    request.personnePhysique.situationMatrimoniale = new SituationMatrimoniale();
    request.personnePhysique.situationMatrimoniale.id = this.defaultValues.situationMatrimoniale!;
    request.personnePhysique.identifiant = 'P000011';

    this.locataireService.create(request).subscribe(res => {
      console.log(JSON.stringify(res));
    });
  }

}
