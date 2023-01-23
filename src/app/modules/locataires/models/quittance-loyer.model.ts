import {Deserializable} from "../../../shared/models/deserializable.model";
import { AvisEcheance } from './avis-echeance.model';

export class QuittanceLoyer implements Deserializable{
  id: string;
  identifiant: string;
  avisEcheance: AvisEcheance;
  dateReglement: Date;
  montantRegle: number;
  observation: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.avisEcheance = new AvisEcheance().deserialize(input.avisEcheance);
    return this;
  }
}
