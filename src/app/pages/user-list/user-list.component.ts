import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'underscore';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import {
  ActionUserListAdd,
  ActionUserListPersist,
  ActionUserListFilter,
  ActionUserListRemoveDone,
  ActionUserListToggle,
  selectorUserList,
  UserList,
  UserListFilter,
  UserListSort,
  ActionUserListSort,
  ActionUserListRemoveAll
} from './user-list.reducer';

@Component({
  selector: 'gusrs-history',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  userlist: any;
  newUserlist = '';
  id:any;
  favourite:boolean = false;

  constructor(public store: Store<any>, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.store
      .select(selectorUserList)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(users => {
        this.userlist = users;
        this.store.dispatch(new ActionUserListPersist({ users }));
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  get sortedUserlist() {
    const sortBy = this.userlist.sort;
    if (sortBy === 'NAME') {
      return _.sortBy(this.userlist.items, 'name');
    } 
    else if (sortBy === 'FAVOURITE') {
      return _.sortBy(this.userlist.items, 'favourite').reverse();
    }
  }
  
  onRemoveAllUsers() {
    this.store.dispatch(new ActionUserListRemoveAll());
    this.showNotification("History Cleared !");
  }
  onToggleFav(user: UserList) {
    const newStatus = user.favourite? false:true;
    this.favourite = newStatus;
    this.store.dispatch(new ActionUserListToggle({ id: user.id }));
    if(newStatus)
      this.showNotification(`User ${user.name} added to Favourite.`);
    else 
      this.showNotification(`User ${user.name} removed from Favourite.`);
  }

  onRemoveDoneUser(user: UserList) {
    this.store.dispatch(new ActionUserListRemoveDone({ id: user.id }));
    this.showNotification(`Removed ${user.name} from history.`);
  }

  onFilterUserList(filter: UserListFilter) {
    this.store.dispatch(new ActionUserListFilter({ filter }));
    this.showNotification(`Filtered to ${filter.toLowerCase()}`);
  }
  onSortUserlist(sort: UserListSort) {
    this.store.dispatch(new ActionUserListSort({ sort }));
    this.showNotification(`Users sorted by ${sort.toLowerCase()}`);
  }
  onDetailsUser(user: UserList) {
    this.id = user.name;
    this.favourite = user.favourite;
    this.showNotification(`Showing profile of ${user.name}`);
  }
  private showNotification(message: string, action?: string) {
    return this.snackBar.open(message, action, {
      duration: 2500,
      panelClass: 'userlist-notification-overlay'
    });
  }
}
