import {Deserializable} from "../../../shared/models/deserializable.model";
import {Civilite} from "../../parametrage/civilites/models/civilite.model";
import {Genre} from "../../parametrage/genres/models/genre.model";
import {SituationMatrimoniale} from "../../parametrage/situation-matrimoniale/models/situation-matrimoniale.model";
import {Personne} from "./personne.model";

export class PersonnePhysique extends Personne implements Deserializable {

  nom: string;
  prenoms: string;
  nomJeuneFille: string;
  dateNaissance: Date;
  lieuNaissance: string;
  civilite: Civilite;
  genre: Genre;
  situationMatrimoniale: SituationMatrimoniale;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.civilite = new Civilite().deserialize(input.civilite);
    this.genre = new Genre().deserialize(input.genre);
    this.situationMatrimoniale = new Genre().deserialize(input.situationMatrimoniale);
    return this;
  }

}
