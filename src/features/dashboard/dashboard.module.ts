import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import DashboardComponent from './dashboard.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export default class DashboardModule {

}
