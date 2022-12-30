import {Deserializable} from "../../../../shared/models/deserializable.model";

export class Genre implements Deserializable {

  id: number;
  identifiant: string;
  libelle: string;
  description: string;
  estActif: string;
  
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
