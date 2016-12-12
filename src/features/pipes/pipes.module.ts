import { NgModule } from '@angular/core';

import MoneyPipe from './money.pipe';
import ReduceSumPipe from './reduce-sum.pipe';

const pipes = [MoneyPipe, ReduceSumPipe];

@NgModule({
  imports: [],
  declarations: pipes,
  exports: pipes,
})
export default class PipesModule {}
