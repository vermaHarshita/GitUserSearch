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
  ActionUserListPersist,
  USERLIST_KEY,
  UserListActionTypes,
} from './user-list.reducer';
import { SearchUserService } from '../search-user/search-user.service';
@Injectable()
export class UserListEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private service: SearchUserService
  ) {}

  @Effect({ dispatch: false })
  persistUserList(): Observable<Action> {
    return this.actions$
      .ofType(UserListActionTypes.PERSIST)
      .pipe(
        tap((action: ActionUserListPersist) =>
          this.localStorageService.setItem(USERLIST_KEY, action.payload.users)
        )
      );
  }
  
}
