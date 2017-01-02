import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgRedux as Store } from 'ng2-redux';
import { IState, isAuthenticated } from '@services/reducers/';

@Injectable()
export default class AuthGuard implements CanActivate {
  private isAuthenticated: boolean = false;

  constructor(private store: Store<IState>, private router: Router) {
    store.select(isAuthenticated)
      .subscribe((isAuthenticated) => this.isAuthenticated = isAuthenticated);
  }

  canActivate(): boolean {
    if (this.isAuthenticated) return true;

    this.router.navigateByUrl('/login');
    return false;
  }
}
