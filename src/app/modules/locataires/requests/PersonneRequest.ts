import {Deserializable} from "../../../shared/models/deserializable.model";
import {TypePersonne} from "../../parametrage/type-personne/model/type-personne.model";
import {PersonnePhysique} from "../models/personne-physique.model";

export class PersonneRequest implements Deserializable {

  typePersonne: TypePersonne;
  personnePhysique: PersonnePhysique;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.typePersonne = new TypePersonne().deserialize(input.typePersonne);
    this.personnePhysique = new PersonnePhysique().deserialize(input.personnePhysique);
    return this;
  }

}
