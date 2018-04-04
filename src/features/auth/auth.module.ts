import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import SharedModule from '../shared.module';
import SignupComponent from './signup/signup.component';
import LoginComponent from './login/login.component';
import LogoutComponent from './logout/logout.component';
import AuthRoutingModule from './auth-routing.module';

@NgModule({
  imports: [SharedModule, FormsModule, AuthRoutingModule],
  declarations: [SignupComponent, LoginComponent, LogoutComponent],
  exports: []
})
export default class AuthModule {}
