import { ActionReducer, MetaReducer } from '@ngrx/store';

// console.log all actions
function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('*** action trigged => "', action.type, '" | {state} = ',  state);
 
    return reducer(state, action);
  };
}
 
export const metaReducers: MetaReducer<any>[] = [debug];
