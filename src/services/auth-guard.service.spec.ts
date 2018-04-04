import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import AuthGuardService from './auth-guard.service';

describe('AuthGuardService', () => {
  it('should return true if user is authenticated', done => {
    const authModelStub: any = {
      auth$: Observable.of({ isAuthenticated: true }),
      checkedAuth$: Observable.of(true)
    };
    const routerStub: any = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    const guard = new AuthGuardService(authModelStub, routerStub);
    guard.canActivate().subscribe(result => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should return false if user is not authenticated and redirect to /login', done => {
    const authModelStub: any = {
      auth$: Observable.of({ isAuthenticated: false }),
      checkedAuth$: Observable.of(true)
    };
    const routerStub: any = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    const guard = new AuthGuardService(authModelStub, routerStub);
    guard.canActivate().subscribe(result => {
      expect(result).toBe(false);
      expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/login');
      done();
    });
  });
});
