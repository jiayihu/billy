import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import AuthModel from './models/auth.model';
import { Observable } from 'rxjs/Observable';
import { IState } from '@services/reducers/';

@Injectable()
export default class AuthGuard implements CanActivate {
  private isAuthenticated$: Observable<boolean>;

  constructor(private authModel: AuthModel, private router: Router) {
    // auth$ is emitted by the store before the authentication is actually checked
    this.isAuthenticated$ = Observable.combineLatest(
      authModel.auth$,
      authModel.checkedAuth$,
      (auth, checkedAuth) => auth.isAuthenticated
    );
  }

  canActivate(): Observable<boolean> {
    return this.isAuthenticated$.do(
      isAuthenticated => !isAuthenticated && this.router.navigateByUrl('/login')
    );
  }
}
