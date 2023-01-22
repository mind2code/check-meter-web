import {Deserializable} from "../../../shared/models/deserializable.model";

export class TypeHabitation implements Deserializable{
  id: number;
  libelle: string;
  description: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
