import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import {
  ActionSearchUsersRetrieve,
  ActionUserSort,
  selectorSearchUsers,
  ActionUserFav,
} from './search-user.reducer';
import {
  ActionUserListAdd, ActionUserListPersist, UserList
} from '../user-list/user-list.reducer';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'anms-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  initialized;
  userStock;
  id:any;
  favourite:boolean = false;
  query:string = '';
  constructor(public store: Store<any>, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initialized = true;
    
    this.store
      .select(selectorSearchUsers)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((stocks: any) => {
        this.userStock = stocks;
        this.query = this.userStock.symbol
        if (!isNullOrUndefined(this.userStock.user)) {
          let items = []
          this.userStock.user.items.forEach(element => {
            items.push(
              { id: uuid(), name: element.login, done: false, favourite: element.favourite }
            )
          });
          this.store.dispatch(new ActionUserListAdd({ users: items }));
        }
        if (!this.initialized) {
          this.initialized = false;
          this.store.dispatch(
            new ActionSearchUsersRetrieve({ symbol: stocks.symbol, favourate: false })
          );
        }
      });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSymbolChange(symbol: string) {
    let favourate: false;
    this.store.dispatch(new ActionSearchUsersRetrieve({ symbol: symbol, favourate: false }));
  }
  onDetails(item: any) {
    this.id = item.login;
    this.favourite = item.favourite;
    this.showNotification(`Showing Profile of User ${item.login}`);
  }
  onToggleFavourite(item: any) {
    this.favourite = !item.favourite;
    this.store.dispatch(new ActionUserFav({ "id":item.login }));
    if( this.favourite )
      this.showNotification(`User ${item.login} Added To Favourite`);
    else 
      this.showNotification(`User ${item.login} Removed From Favourite`);
  }
  onSortUsers(sort: string) {
    if(sort === 'Name')
    this.store.dispatch(new ActionUserSort({ "sort":'login' }));
    if(sort === 'Favourite')
    this.store.dispatch(new ActionUserSort({ "sort":'favourite' }));
    
    this.showNotification(" Users Sorted by " + sort);
  }
  private showNotification(message: string, action?: string) {
    return this.snackBar.open(message, action, {
      duration: 2500,
      panelClass: 'userlist-notification-overlay'
    });
  }
  onSearch() {
    this.store.dispatch(new ActionSearchUsersRetrieve({ symbol: this.query,
      favourate: false}));
    this.query = '';
  }

  onSearchChange(query: string) {
    this.query = query;
  }
}
