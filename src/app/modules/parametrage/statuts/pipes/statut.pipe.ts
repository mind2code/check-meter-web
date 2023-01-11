import { Pipe, PipeTransform } from '@angular/core';
import { Statut } from '../models/statut.model';

@Pipe({
  name: 'statut',
})
export class StatutPipe implements PipeTransform {
  transform(value: Statut, ...args: any[]) {
    switch (String(value.identifiant).toUpperCase()) {
      case 'EAT':
        return `<span class="badge badge-light-primary">${value.libelle}</span>`;
      default:
        return `<span class="badge badge-light-info">${value.libelle}</span>`;
    }
  }

}
