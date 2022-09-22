import { createReducer, on } from '@ngrx/store';
import { addQueryHistory, addResultHistory, setSelectedQueryIndex } from './history-actions';

export interface HistoryState {
  searchQueryHistoryList: any;
  searchResultHistoryList: any;
  selectedQueryIndex: any;
}

export const initialState: HistoryState = {
  searchQueryHistoryList: [],
  searchResultHistoryList: [],
  selectedQueryIndex: []
};

export const historyReducer = createReducer(
  initialState,
  on(addQueryHistory, (state, {searchParams}) => ({ ...state, searchQueryHistoryList: [...state.searchQueryHistoryList, searchParams] })),
  on(addResultHistory, (state, {searchResultList}) => ({ ...state, searchResultHistoryList: [...state.searchResultHistoryList, searchResultList] })),
  on(setSelectedQueryIndex, (state, index) => ({ ...state, selectedQueryIndex: [...state.selectedQueryIndex, index] })),
);
