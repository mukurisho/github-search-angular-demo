import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { GithubRepository } from 'src/app/feature/repositories/github.repository';

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
      tap((action) => console.log(action)),
      switchMap((action) =>
        this.githubRepository.getUser()
        .pipe(
          tap((results) => {console.log('dicsak: ', results)}),
          map((results) => searchSuccess({results: results})),
          catchError((err) => of(searchError()))
        )
      )
    )
  );
}
