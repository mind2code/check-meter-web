import { createFeature, createReducer, on } from '@ngrx/store';
import { AvisEcheance } from '../../models/avis-echeance.model';
import { AvisEcheancesActions } from '../actions/avis-echeances.actions';

export const featerName = 'avisEcheances';

export interface AvisEcheanceStateInterface {
  selected: AvisEcheance | undefined;
}

export const initialState: AvisEcheanceStateInterface = {
  selected: undefined,
};

export const avisEcheancesFeature = createFeature({
  name: featerName,
  reducer: createReducer(
    initialState,
    on(AvisEcheancesActions.setSelected, (state, payload) => ({ ...state, selected: payload.selected }))
  )
});

export const {
  name,
  reducer,
  selectAvisEcheancesState,
  selectSelected,
} = avisEcheancesFeature;
