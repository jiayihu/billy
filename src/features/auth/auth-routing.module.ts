import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import SignupComponent from './signup/signup.component';
import LogoutComponent from './logout/logout.component';

const routes: Route[] = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class AuthRoutingModule {}
