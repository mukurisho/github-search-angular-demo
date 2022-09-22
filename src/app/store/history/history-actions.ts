import { createAction, props } from '@ngrx/store';
import { SearchParameters } from 'src/app/models/search-parameters';

export const addQueryHistory = createAction(
  '[History] addQueryHistory',
  props<{ searchParams: SearchParameters }>()
);

export const addResultHistory = createAction(
  '[History] addResultHistory',
  props<{ searchResultList: any }>()
);

export const setSelectedQueryIndex = createAction(
  '[History] setSelectedQueryIndex',
  props<{ index: number }>()
);
