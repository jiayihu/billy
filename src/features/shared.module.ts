import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import DirectivesModule from './directives/directives.module';
import PipesModule from './pipes/pipes.module';
import UiModule from './ui/ui.module';

const modules = [CommonModule, DirectivesModule, PipesModule, UiModule];

@NgModule({
  imports: modules,
  exports: modules
})
export default class SharedModule {}
