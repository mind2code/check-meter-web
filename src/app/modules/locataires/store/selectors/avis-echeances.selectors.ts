import { createSelector } from '@ngrx/store';
import { avisEcheancesFeature } from '../reducers/avis-echeances.reducer';


export const selectedAvisEcheance = createSelector(
  avisEcheancesFeature.selectSelected,
  (state) => state
)
