import { addResultHistory } from './../history/history-actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { GithubRepository } from 'src/app/feature/repositories/github.repository';
import { addQueryHistory } from '../history/history-actions';

import { search, searchError, searchSuccess } from './search-actions';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private githubRepository: GithubRepository
  ) {}

  loadSearchResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
      switchMap((action) =>
        this.githubRepository.getUser(action.searchParams)
        .pipe(
          switchMap((results) =>  [
            searchSuccess({results: results}),
            addQueryHistory({searchParams: action.searchParams}),
            addResultHistory({searchResultList: results.items})
          ]),
          catchError((err) => of(searchError()))
        )
      )
    )
  );
}
