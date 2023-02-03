import {Deserializable} from "../../../shared/models/deserializable.model";
import {TypePersonne} from "../../parametrage/type-personne/model/type-personne.model";
import {Civilite} from "../../parametrage/civilites/models/civilite.model";
import {Genre} from "../../parametrage/genres/models/genre.model";
import {SituationMatrimoniale} from "../../parametrage/situation-matrimoniale/models/situation-matrimoniale.model";

export class Personne implements Deserializable {

  id: string;
  identifiant: string;
  nomComplet: string;
  nom: string;
  prenoms: string;
  dateNaissance: Date;
  lieuNaissance: string;
  civilite: Civilite;
  genre: Genre;
  situationMatrimoniale: SituationMatrimoniale;
  description: string;
  estActif: boolean;
  typePersonne: TypePersonne;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.typePersonne = new TypePersonne().deserialize(input.typePersonne);
    this.civilite = new Civilite().deserialize(input.civilite);
    this.genre = new Genre().deserialize(input.genre);
    this.situationMatrimoniale = new SituationMatrimoniale().deserialize(input.situationMatrimoniale);
    return this;
  }

}
