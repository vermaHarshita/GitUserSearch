import { Component, OnInit,OnChanges, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'underscore';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import {
 ActionUDRetrieve,
 selectorUserDetails
} from './user-detail.reducer';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit, OnChanges, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  userDetail: any = {};
  @Input() userId: string;
  @Input() isFavourite: boolean;
  constructor(public store: Store<any>, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.store
      .select(selectorUserDetails)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.userDetail = user;
      });
  }
  ngOnChanges(){
    this.store.dispatch(new ActionUDRetrieve({ id: this.userId }));
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
