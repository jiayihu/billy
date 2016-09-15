import './styles/main.scss';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import AppModule from './app/app.module';

import './rxjs-extensions';
import './firebase';

platformBrowserDynamic().bootstrapModule(AppModule);
