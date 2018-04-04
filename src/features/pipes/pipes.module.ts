import { NgModule } from '@angular/core';

import FilterPipe from './filter.pipe';
import ReduceSumPipe from './reduce-sum.pipe';

const pipes = [FilterPipe, ReduceSumPipe];

@NgModule({
  imports: [],
  declarations: pipes,
  exports: pipes
})
export default class PipesModule {}
