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
  ActionUDRetrieve,
  ActionUDRetrieveError,
  ActionUDRetrieveSuccess,
  USER_KEY,
  UserDetailActionTypes,
} from './user-detail.reducer';

import { UserDetailService } from './user-detail.service';

@Injectable()
export class UserDetailEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private service: UserDetailService
  ) {}

  @Effect()
  retrieveStock(): Observable<Action> {
    return this.actions$.ofType(UserDetailActionTypes.RETRIEVE).pipe(

      switchMap((action: ActionUDRetrieve) =>
        this.service
          .retrieveUserDetail(action.payload.id)
          .pipe(
            map(userDet => new ActionUDRetrieveSuccess({ userDet })),
            catchError(error =>
              of(new ActionUDRetrieveError({ error }))
            )
          )
      )
    );
  }
  
}
