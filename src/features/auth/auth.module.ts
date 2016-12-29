import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import SharedModule from '../shared.module';
import SignupComponent from './signup/signup.component';

@NgModule({
  imports: [SharedModule, FormsModule],
  declarations: [SignupComponent],
  exports: [SignupComponent],
})
export default class AuthModule {

}
