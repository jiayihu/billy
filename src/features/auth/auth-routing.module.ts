import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import LoginComponent from './login/login.component';
import LogoutComponent from './logout/logout.component';
import SignupComponent from './signup/signup.component';

const routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class AuthRoutingModule {}
