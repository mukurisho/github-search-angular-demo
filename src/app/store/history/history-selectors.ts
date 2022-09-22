import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HistoryState } from './history-reducer';

const selectHistoryState = createFeatureSelector<HistoryState>('history');

export const selectQueryHistoryList = createSelector(
    selectHistoryState,
  (state: HistoryState) => state.searchQueryHistoryList
);

export const selectResultHistoryList = createSelector(
    selectHistoryState,
  (state: HistoryState) => state.searchResultHistoryList
);

export const selectResultHistoryItem = createSelector(
  selectHistoryState,
(state: HistoryState) => {
  if (state.selectedQueryIndex && state.selectedQueryIndex.length>0) {
    return state.searchResultHistoryList[state.selectedQueryIndex[state.selectedQueryIndex.length-1].index]
  }
}
);
