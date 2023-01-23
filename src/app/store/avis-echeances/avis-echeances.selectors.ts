import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AvisEcheance } from '../../modules/locataires/models/avis-echeance.model';
import { State } from './avis-echeances.reducer';

export const  avisEcheancesState = (avisEcheanceState: State) => avisEcheanceState;

export const selectedAvisEcheance = createSelector(
  avisEcheancesState,
  (state) => state.selected
)
