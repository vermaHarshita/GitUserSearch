import { v4 as uuid } from 'uuid';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
export const USER_KEY = 'PAGES.USER';
import * as _ from 'underscore';

export enum UserDetailActionTypes {
  RETRIEVE = '[UserDetail] Retrieve',
  RETRIEVE_SUCCESS = '[UserDetail] Retrieve Success',
  RETRIEVE_ERROR = '[UserDetail] Retrieve Error'
}

export class ActionUDRetrieve implements Action {
  readonly type = UserDetailActionTypes.RETRIEVE;
  constructor(public payload: { id: string }) { }
}

export class ActionUDRetrieveSuccess implements Action {
  readonly type = UserDetailActionTypes.RETRIEVE_SUCCESS;
  constructor(public payload: { userDet: UserDetail }) { }
}

export class ActionUDRetrieveError implements Action {
  readonly type = UserDetailActionTypes.RETRIEVE_ERROR;
  constructor(public payload: { error: HttpErrorResponse }) { }
}
export type TodosActions =
  | ActionUDRetrieve
  | ActionUDRetrieveSuccess
  | ActionUDRetrieveError;

export const initialState: UserDetailState = {
  detail: {
    id: '',
    name: '',
    company:'',
    blog:'',
    location:'',
    bio:'',
    public_repos:0,
    public_gists:0,
    followers:0,
    following:0,
  },
  id: '',
  error: null,
  loading: false
};

export const selectorUserDetails = state => state.pages.users;

export function userDetailReducer(state: UserDetailState = initialState, action: TodosActions): UserDetailState {
  switch (action.type) {
    case UserDetailActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        detail: null,
        error: null,

      };

    case UserDetailActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.userDet,
        error: null,

      };

    case UserDetailActionTypes.RETRIEVE_ERROR:
      return {
        ...state,
        loading: false,
        detail: null,
        error: action.payload.error
      };

    default:
      return state;
  }
}

export interface UserDetail {
  id: string;
  name: string;
  company: string;
  blog: string;
  location:string;
  bio:string;
  public_repos:number;
  public_gists:number;
  followers:number;
  following:number;
  avatar_url?:string;
  html_url?:string;
}


export interface UserDetailState {
  detail: UserDetail;
  id: string;
  error?: HttpErrorResponse;
  loading: boolean;
}
