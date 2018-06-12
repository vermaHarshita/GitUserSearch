import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  tap,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError
} from 'rxjs/operators';

import { LocalStorageService } from '@app/core';

import {
  ActionSearchUsersRetrieve,
  ActionSearchUsersRetrieveError,
  ActionSearchUsersRetrieveSuccess,
  SEARCH_USER_KEY,
  SearchUsersActionTypes,
} from './search-user.reducer';
import { SearchUserService } from './search-user.service';
import { isNullOrUndefined } from 'util';

@Injectable()
export class SearchUserEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private service: SearchUserService
  ) {}

  @Effect()
  retrieveUsers(): Observable<Action> {
    return this.actions$.ofType(SearchUsersActionTypes.RETRIEVE).pipe(
      tap((action: ActionSearchUsersRetrieve) =>{
          this.localStorageService.setItem(SEARCH_USER_KEY, {
            symbol: action.payload.symbol,favourate: action.payload.favourate
          })
      }
      ),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((action: ActionSearchUsersRetrieve) =>
        this.service
          .retrieveUser(action.payload.symbol)
          .pipe(
            map(allusers => new ActionSearchUsersRetrieveSuccess({ allusers })),
            catchError(error =>
              of(new ActionSearchUsersRetrieveError({ error }))
            )
          )
      )

    );
  }
}
