import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/commons.model';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: Status, ...args: any[]) {
    switch (String(value.identifiant).toUpperCase()) {
      // En attente de paiement
      case 'S001':
        return `<span class="badge fw-bolder badge-light-primary">${value.libelle}</span>`;
      // En attente de validation
      case 'S002':
        return `<span class="badge fw-bolder badge-light-warning">${value.libelle}</span>`;
      // Résilié
      case 'S003':
        return `<span class="badge fw-bolder badge-light-danger">${value.libelle}</span>`;
      // Clôturé
      case 'S004':
        return `<span class="badge fw-bolder badge-light-info">${value.libelle}</span>`;
      // Annulé
      case 'S005':
        return `<span class="badge fw-bolder badge-danger">${value.libelle}</span>`;
      // Réglé
      case 'S006':
        return `<span class="badge fw-bolder badge-success">${value.libelle}</span>`;
      // Réglé partiellement
      case 'S007':
        return `<span class="badge fw-bolder badge-light-success">${value.libelle}</span>`;
      // Autres
      default:
        return `<span class="badge fw-bolder badge-secondary">${value.libelle}</span>`;
    }
  }

}
