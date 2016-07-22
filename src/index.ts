import './rxjs-extensions';

import { bootstrap } from '@angular/platform-browser-dynamic';
import AppComponent from './components/app/app';
import { appRouterPrividers } from './components/app/app.routes';
import { XHRBackend, HTTP_PROVIDERS } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import InMemoryDataService from './services/in-memory-data';

bootstrap(AppComponent, [
  appRouterPrividers,
  HTTP_PROVIDERS,
  { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
  { provide: SEED_DATA, useClass: InMemoryDataService }      // in-mem server data
]);
