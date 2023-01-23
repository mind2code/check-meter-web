import { createActionGroup, props } from '@ngrx/store';
import { AvisEcheance } from '../../models/avis-echeance.model';

export const AvisEcheancesActions = createActionGroup({
  source: 'AvisEcheances',
  events: {
    'Set selected': props<{ selected: AvisEcheance | undefined }>(),
  }
});
