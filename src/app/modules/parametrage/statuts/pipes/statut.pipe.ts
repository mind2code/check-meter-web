import { Pipe, PipeTransform } from '@angular/core';
import { Statut } from '../models/statut.model';

@Pipe({
  name: 'statut',
})
export class StatutPipe implements PipeTransform {
  transform(value: Statut, ...args: any[]) {
    switch (String(value.identifiant).toUpperCase()) {
      case 'EAT':
      case 'S002':
        return `<span class="badge fw-bolder badge-light-primary">${value.libelle}</span>`;
      case 'S003':
        return `<span class="badge fw-bolder badge-light-warning">${value.libelle}</span>`;
      default:
        return `<span class="badge fw-bolder badge-light-warning">${value.libelle}</span>`;
    }
  }

}
