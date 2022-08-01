import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VenkoState } from './venko.reducer';
import * as AppState from './app.state';

export interface State extends AppState.State {
  app: VenkoState;
}

const itemSelector = createFeatureSelector<VenkoState>('app');

export const getItems = createSelector(itemSelector, (state) => state.items);

export const getIsLogged = createSelector(itemSelector, (state) => state.isLogged);

export const getUser = createSelector(itemSelector, (state) => state.user);