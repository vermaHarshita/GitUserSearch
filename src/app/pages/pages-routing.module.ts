import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageContainerComponent } from './page-container/page-container.component';
import { UserListComponent } from './user-list/user-list.component';
import { SearchUserComponent } from './search-user/search-user.component';

const routes: Routes = [
  {
    path: '',
    component: PageContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'history',
        component: UserListComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'search',
        component: SearchUserComponent,
        data: {
          title: 'Search Users'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
