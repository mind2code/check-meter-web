import { Person } from './person.model';

/**
 * fr => Locataire
 */
export interface Tenant extends Person {
  solde: number;
}
