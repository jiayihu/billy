import './styles/main.css';
import './styles/print.css';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import AppModule from './app/app.module';

import './rxjs-extensions';

platformBrowserDynamic().bootstrapModule(AppModule);
