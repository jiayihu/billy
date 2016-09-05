import { Component, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { firebase } from '../../../firebase';

@Component({
  selector: 'signup',
  template: require('./signup.component.html'),
})
export default class SignupComponent {
  email: string;
  password: string;
  passwordConfirm: string;

  @ViewChild('emailInput') emailInput: NgModel;
  @ViewChild('pswInput') pswInput: NgModel;

  onSubmit() {
    const email: string = this.emailInput.value;
    const password: string = this.pswInput.value;
    const auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        console.log('User logged in', user);
      } else {
        // No user is signed in.
      }
    });
    console.log('onSubmit', email, password);
    auth.createUserWithEmailAndPassword(email, password)
      .catch(err => console.error(err));
  }
}
