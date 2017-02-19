import './styles/main.css';
import './styles/print.css';
import './polyfills';
import './rxjs-extensions';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import AppModule from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
