import { bootstrap } from '@angular/platform-browser-dynamic';
import AppComponent from './components/app/app';
import { appRouterPrividers } from './components/app/app.routes';

bootstrap(AppComponent, [
  appRouterPrividers
]);
