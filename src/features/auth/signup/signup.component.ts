import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'signup',
  template: require('./signup.component.html'),
})
export default class SignupComponent {
  email: string;
  password: string;
  passwordConfirm: string;
}
