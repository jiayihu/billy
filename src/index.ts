import './styles/main.scss';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import AppComponent from './app/app.component';
import appRouterProviders from './app/app.routes';

import './rxjs-extensions';
import './firebase';

bootstrap(AppComponent, [
  appRouterProviders,
  disableDeprecatedForms(),
  provideForms(),
]);
