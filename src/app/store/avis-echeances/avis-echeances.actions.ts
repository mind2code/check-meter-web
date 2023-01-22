import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AvisEcheance } from '../../modules/locataires/models/avis-echeance.model';

export const AvisEcheancesActions = createActionGroup({
  source: 'AvisEcheances',
  events: {
    'Set selected': props<{ selected: AvisEcheance | undefined }>(),
  }
});
