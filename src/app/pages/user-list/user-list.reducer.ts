import { v4 as uuid } from 'uuid';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
export const USERLIST_KEY = 'PAGES.USERLIST';
import * as _ from 'underscore';

export enum UserListActionTypes {
  ADD = '[UserList] Add',
  TOGGLE = '[UserList] Toggle',
  REMOVE_DONE = '[UserList] Remove Done',
  FILTER = '[UserList] Filter',
  PERSIST = '[UserList] Persist',
  SORT = '[UserList] Sort',
  REMOVE_ALL = '[UserList] Remove All',
}

export class ActionUserListAdd implements Action {
  readonly type = UserListActionTypes.ADD;
  constructor(public payload: { users: UserList[] }) { }
}

export class ActionUserListToggle implements Action {
  readonly type = UserListActionTypes.TOGGLE;
  constructor(public payload: { id: string }) { }
}

export class ActionUserListRemoveDone implements Action {
  readonly type = UserListActionTypes.REMOVE_DONE;
  constructor(public payload: { id: string }) { }
}

export class ActionUserListFilter implements Action {
  readonly type = UserListActionTypes.FILTER;
  constructor(public payload: { filter: UserListFilter }) { }
}
export class ActionUserListSort implements Action {
  readonly type = UserListActionTypes.SORT;
  constructor(public payload: { sort: UserListSort }) { }
}

export class ActionUserListPersist implements Action {
  readonly type = UserListActionTypes.PERSIST;
  constructor(public payload: { users: UserList[] }) { }
}
export class ActionUserListRemoveAll implements Action {
  readonly type = UserListActionTypes.REMOVE_ALL;
}
export type UserListActions =
  | ActionUserListAdd
  | ActionUserListToggle
  | ActionUserListRemoveDone
  | ActionUserListFilter
  | ActionUserListPersist
  | ActionUserListSort
  | ActionUserListRemoveAll;

export const initialState: UserListState = {
  items: [
  ],
  filter: 'ALL',
  sort: 'NAME',
  loading: false,
  error: null
};

export const selectorUserList = state => state.pages.userlist;

export function userlistReducer(
  state: UserListState = initialState,
  action: UserListActions
): UserListState {
  switch (action.type) {
    case UserListActionTypes.ADD:
      return {
        ...state,
        items: _.uniq(action.payload.users.concat(state.items),'name')
      };

    case UserListActionTypes.TOGGLE:
      return {
        ...state,
        items: state.items.map(
          (item: UserList) =>
            item.id === action.payload.id ? { ...item, favourite: !item.favourite } : item
        )
      };

    case UserListActionTypes.REMOVE_DONE:
      return {
        ...state,
        items: state.items.filter((item: UserList) => item.id != action.payload.id)
      };
    case UserListActionTypes.REMOVE_ALL:
      return {
        ...state,
        items: []
      };
    case UserListActionTypes.FILTER:
      return { ...state, filter: action.payload.filter };
    case UserListActionTypes.SORT:
      return {
        ...state,
        sort: action.payload.sort,
      };
    default:
      return state;
  }
}

export interface UserList {
  id: string;
  name: string;
  done: boolean;
  favourite: boolean;
}

export type UserListFilter = 'ALL' | 'DONE' | 'ACTIVE';
export type UserListSort = 'NAME' | 'FAVOURITE';
export interface UserListState {
  items: UserList[];
  filter: UserListFilter;
  sort: UserListSort;
  error?: HttpErrorResponse;
  loading: boolean;
}
