import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import ModelService from '@services/model.service';

@Component({
  selector: 'logout',
  template: `
    <alert type="info">You are being logged out. Come back soon!</alert>
  `,
  styles: [
    `
      alert { margin: 1.5rem; }
    `,
  ],
})
export default class LogoutComponent implements OnInit {
  // @TODO: Move firebase to AuthModel
  constructor(
    private firebase: AngularFire,
    private modelService: ModelService,
    private router: Router
  ) {}

  ngOnInit() {
    window.setTimeout(() => {
      this.firebase.auth.logout();
      this.modelService.logout();
      this.router.navigateByUrl('/');
    }, 3000);
  }
}
