import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { PagesRoutingModule } from './pages-routing.module';
import { PageContainerComponent } from './page-container/page-container.component';

import { UserListComponent } from './user-list/user-list.component';
import { userlistReducer } from './user-list/user-list.reducer';
import { UserListEffects } from './user-list/user-list.effects';

import { SearchUserComponent } from './search-user/search-user.component';
import { searchUsersReducer } from './search-user/search-user.reducer';
import { SearchUserEffects } from './search-user/search-user.effects';
import { SearchUserService } from './search-user/search-user.service';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { userDetailReducer } from './user-detail/user-detail.reducer';
import { UserDetailEffects } from './user-detail/user-detail.effects';
import { UserDetailService } from './user-detail/user-detail.service';
@NgModule({
  imports: [
    SharedModule,
    PagesRoutingModule,
    StoreModule.forFeature('pages', {
      userlist: userlistReducer,
      stocks: searchUsersReducer,
      users: userDetailReducer
    }),
    EffectsModule.forFeature([UserListEffects, SearchUserEffects, UserDetailEffects])
  ],
  declarations: [
    PageContainerComponent,
    UserListComponent,
    SearchUserComponent,
    UserDetailComponent
  ],
  providers: [SearchUserService, UserDetailService]
})
export class PagesModule {
  constructor() {}
}
