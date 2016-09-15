import { NgModule } from '@angular/core';
import SharedModule from '../../shared/shared.module';
import SignupComponent from './signup/signup.component';

@NgModule({
  imports: [SharedModule],
  declarations: [SignupComponent],
  exports: [SignupComponent],
})
export default class AutModule {

}
