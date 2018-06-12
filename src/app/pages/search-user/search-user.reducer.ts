import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';
export const SEARCH_USER_KEY = 'PAGES.STOCKS';
export enum SearchUsersActionTypes {
  RETRIEVE = '[Users] Retrieve',
  RETRIEVE_SUCCESS = '[Users] Retrieve Success',
  RETRIEVE_ERROR = '[Users] Retrieve Error',
  USER_SORT = '[Users] Sort',
  USER_FAV = '[Users] Favorite'
}

export class ActionSearchUsersRetrieve implements Action {
  readonly type = SearchUsersActionTypes.RETRIEVE;
  constructor(public payload: { symbol: string, favourate: boolean }) { }
}

export class ActionSearchUsersRetrieveSuccess implements Action {
  readonly type = SearchUsersActionTypes.RETRIEVE_SUCCESS;
  constructor(public payload: { allusers: Users }) { }
}

export class ActionSearchUsersRetrieveError implements Action {
  readonly type = SearchUsersActionTypes.RETRIEVE_ERROR;
  constructor(public payload: { error: HttpErrorResponse }) { }
}
export class ActionUserSort implements Action {
  readonly type = SearchUsersActionTypes.USER_SORT;
  constructor(public payload: { sort: string }) { }
}
export class ActionUserFav implements Action {
  readonly type = SearchUsersActionTypes.USER_FAV;
  constructor(public payload: { id: string }) { }
}
export type SearchUsersActions =
  | ActionSearchUsersRetrieve
  | ActionSearchUsersRetrieveSuccess
  | ActionSearchUsersRetrieveError
  | ActionUserSort
  | ActionUserFav;

export const initialState: SearchUserState = {
  symbol: '',
  loading: false,

};

export const selectorSearchUsers = state => state.pages.stocks;

export function searchUsersReducer(state: SearchUserState = initialState, action: SearchUsersActions): SearchUserState {
  switch (action.type) {
    case SearchUsersActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        user: null,
        error: null,
        symbol: action.payload.symbol

      };

    case SearchUsersActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.allusers,
        error: null,

      };

    case SearchUsersActionTypes.RETRIEVE_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload.error
      };
    case SearchUsersActionTypes.USER_SORT:
      return {
        ...state,
        loading: false,
        user: sortItems(state.user,action.payload.sort),
        error: null
      };
      case SearchUsersActionTypes.USER_FAV:
      return {
        ...state,
        loading: false,
        user: setFav(state.user,action.payload.id),
        error: null
      };

    default:
      return state;
  }
}
function setFav(obj:any,id){
  let item =  obj.items.map(
     (item: any) =>
       item.login === id ? { ...item, favourite: !item.favourite } : item
   )
 return {
   incomplete_results: obj.incomplete_results,
   total_count: obj.total_count,
   items:item
 };
}
function sortItems(obj:any,sortby:string){
  let sortedItem:any;
  if (sortby === 'login') {
    sortedItem = _.sortBy(obj.items, sortby)
  } 
  else if (sortby === 'favourite') {
    sortedItem = _.sortBy(obj.items, sortby).reverse();
  }
  return {
    incomplete_results: obj.incomplete_results,
    total_count: obj.total_count,
    items:sortedItem
  };
}

export interface Users {
  incomplete_results: string;
  total_count: string;
  items: any;
}

export interface SearchUserState {
  symbol: string
  user?: Users;
  loading: boolean;
  error?: HttpErrorResponse;
}
