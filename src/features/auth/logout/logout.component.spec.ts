import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import SharedModule from '../../shared.module';
import { Router } from '@angular/router';
import { AuthModel } from '@services/models/';
import LogoutComponent from './logout.component';

describe('LogoutComponent', () => {
  let comp: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let el: HTMLElement;
  let authModel: any;
  let router: any;

  beforeEach(() => {
    const routerStub = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    const authModelStub = {
      logout: jasmine.createSpy('logout')
    };

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [LogoutComponent],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AuthModel, useValue: authModelStub }
      ]
    });

    fixture = TestBed.createComponent(LogoutComponent);
    comp = fixture.componentInstance;

    authModel = fixture.debugElement.injector.get(AuthModel);
    router = fixture.debugElement.injector.get(Router);

    el = fixture.debugElement.query(By.css('alert')).nativeElement;
    fixture.detectChanges();
  });

  it(
    'should call authModel.logout() and redirect to /',
    async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(authModel.logout).toHaveBeenCalled();
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
      });
    })
  );

  it('should show an alert for the user', () => {
    expect(el).toBeDefined();
  });
});
