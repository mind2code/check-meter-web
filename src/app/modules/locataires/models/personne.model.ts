import {Deserializable} from "../../../shared/models/deserializable.model";
import {TypePersonne} from "../../parametrage/type-personne/model/type-personne.model";

export class Personne implements Deserializable {

  id: string;
  identifiant: string;
  nomComplet: string;
  estActif: string;
  typePersonne: TypePersonne;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.typePersonne = new TypePersonne().deserialize(input.typePersonne);
    return this;
  }

}
