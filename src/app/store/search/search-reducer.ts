import { createReducer, on } from '@ngrx/store';
import { ApiStatus } from 'src/app/models/api-status.enum';
import { GithubApiResults } from 'src/app/models/github-api-results';

import { search, searchError, searchSuccess } from './search-actions';

export interface SearchState {
  apiStatus: ApiStatus;
  results: any;
}

export const initialState: SearchState = {
  apiStatus: ApiStatus.Initial,
  results: [],
};

export const searchReducer = createReducer(
  initialState,
  on(search, (state) => ({ ...state, apiStatus: ApiStatus.Loading })),
  on(searchSuccess, (state, { results }) => ({
    ...state,
    results,
    apiStatus: ApiStatus.Loaded,
  })),
  on(searchError, (state) => ({ ...state, apiStatus: ApiStatus.Error }))
);
