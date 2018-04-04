import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AuthModel } from '@services/models/';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export default class LoginComponent {
  email: string;
  password: string;

  constructor(
    private authModel: AuthModel,
    private notifications: NotificationsService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    const { email, password } = form.value;

    this.authModel
      .login(email, password)
      .then(() => {
        this.notifications.success('Login', 'Welcome to Billy.');
        this.router.navigateByUrl('/create');
      })
      .catch(err => {
        console.error(err);
        this.notifications.error('Login', err.message);
      });
  }
}
