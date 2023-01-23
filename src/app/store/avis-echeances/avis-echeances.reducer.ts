import { createReducer, on } from '@ngrx/store';
import { AvisEcheance } from 'src/app/modules/locataires/models/avis-echeance.model';
import { AvisEcheancesActions } from './avis-echeances.actions';

export interface State {
  selected?: AvisEcheance;
}

export const initialState: State = {
  selected: undefined,
};

export const avisEcheancesReducer = createReducer(
  initialState,
  on(AvisEcheancesActions.setSelected, (state) => ({ ...state, selected: state.selected }) )
);

