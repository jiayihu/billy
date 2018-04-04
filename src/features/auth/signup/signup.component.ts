import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthModel } from '@services/models/';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html'
})
export default class SignupComponent {
  email: string;
  password: string;
  passwordConfirm: string;

  constructor(
    private authModel: AuthModel,
    private notifications: NotificationsService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    const { email, password } = form.value;

    this.authModel
      .signup(email, password)
      .then(() => {
        this.notifications.success('Registration', 'Your account is created.');
        this.router.navigateByUrl('/create');
      })
      .catch(err => {
        console.error(err);
        this.notifications.error('Registration', err.message);
      });
  }
}
