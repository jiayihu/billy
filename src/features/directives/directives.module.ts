import { NgModule } from '@angular/core';

import RangeValidatorDirective from './range-validator.directive';

const directives = [RangeValidatorDirective];

@NgModule({
  imports: [],
  declarations: directives,
  exports: directives
})
export default class DirectivesModule {}
