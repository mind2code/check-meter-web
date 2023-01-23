import {Deserializable} from "../../../shared/models/deserializable.model";
import { Locataire } from '../../locataires/models/locataire.model';
import { TypeHabitation } from './type-habitation.model';

export class Habitation implements Deserializable{
  id: string;
  identifiant: string;
  description: string;
  localisation: string;
  superficie: number;
  longitude: string;
  latitude: string;
  typeHabitation?: TypeHabitation;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.typeHabitation = new TypeHabitation().deserialize(input.typeHabitation);
    return this;
  }
}
