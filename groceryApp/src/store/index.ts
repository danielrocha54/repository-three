import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../environments/environment';
import * as fromAppData from './reducers/data.reducer';

export interface AppState {
	appState: fromAppData.State
}

export const reducers: ActionReducerMap<AppState> = {
	appState: fromAppData.reducer
}

export const selectAppData = (state: AppState) => state.appState;

export const selectCart = createSelector(
	selectAppData,
	(state: fromAppData.State) => state.cart
);

export const selectTotal = createSelector(
	selectAppData,
	(state: fromAppData.State) => state.total
);

export const selectQuantity = createSelector(
	selectAppData,
	(state: fromAppData.State) => state.quantity
);

export const selectSuccess = createSelector(
	selectAppData,
	(state: fromAppData.State) => state.success
);

export const selectError = createSelector(
	selectAppData,
	(state: fromAppData.State) => state.error
);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];