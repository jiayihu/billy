import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '@services/models/';

@Component({
  selector: 'logout',
  template: `
    <alert type="info">You are being logged out. Come back soon!</alert>
  `,
  styles: [
    `
      alert { margin: 1.5rem; }
    `
  ]
})
export default class LogoutComponent implements OnInit {
  constructor(private authModel: AuthModel, private router: Router) {}

  ngOnInit() {
    window.setTimeout(() => {
      this.authModel.logout();
      this.router.navigateByUrl('/');
    }, 2000);
  }
}
