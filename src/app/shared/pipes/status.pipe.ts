import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/commons.model';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: Status, ...args: any[]) {
    switch (String(value.identifiant).toUpperCase()) {
      // En attente
      case 'EAT':
      case 'S002':
        return `<span class="badge fw-bolder badge-light-primary">${value.libelle}</span>`;
      // Clôturé
      case 'S003':
        return `<span class="badge fw-bolder badge-light-warning">${value.libelle}</span>`;
      // Annulé
      case 'S004':
        return `<span class="badge fw-bolder badge-light-danger">${value.libelle}</span>`;
      // Réglé
      case 'S005':
        return `<span class="badge fw-bolder badge-light-success">${value.libelle}</span>`;
      // Réglé partiellement
      case 'S006':
        return `<span class="badge fw-bolder badge-light-info">${value.libelle}</span>`;
      // Autres
      default:
        return `<span class="badge fw-bolder badge-secondary">${value.libelle}</span>`;
    }
  }

}
