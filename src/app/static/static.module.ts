import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [SharedModule, StaticRoutingModule],
  declarations: [DashboardComponent]
})
export class StaticModule {}
