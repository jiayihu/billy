import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import SharedModule from '../shared.module';

import NotFoundComponent from './not-found/not-found.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [NotFoundComponent]
})
export default class StaticModule {}
