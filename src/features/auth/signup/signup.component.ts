import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
})
export default class SignupComponent {
  email: string;
  password: string;
  passwordConfirm: string;

  constructor(
    private firebase: AngularFire,
    private notifications: NotificationsService,
    private router: Router,
  ) {}

  onSubmit(form: NgForm) {
    const { email, password } = form.value;

    this.firebase.auth.createUser({ email, password })
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
