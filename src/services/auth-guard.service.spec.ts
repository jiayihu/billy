import { Router } from '@angular/router';
import AuthGuardService from './auth-guard.service';
import { configureStore } from '@test/store-stub';
describe('AuthGuardService', () => {
  it('should return true if user is authenticated', () => {
    const routerStub: any = {
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };
    const state = { auth: { isAuthenticated: true } };
    const store: any = configureStore(state);

    const guard = new AuthGuardService(store, routerStub);
    expect(guard.canActivate()).toBe(true);
  });

  it('should return false if user is not authenticated and redirect to /login', () => {
    const routerStub: any = {
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };
    const state = { auth: { isAuthenticated: false } };
    const store: any = configureStore(state);

    const guard = new AuthGuardService(store, routerStub);
    expect(guard.canActivate()).toBe(false);
    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
