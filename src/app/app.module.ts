import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import AuthModule from '../features/auth/auth.module';
import CustomersModule from '../features/customers/customers.module';
import InvoicesModule from '../features/invoices/invoices.module';
import StaticModule from '../features/static/static.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import AppFirebaseModule from './app-firebase.module';
import AppStoreModule from './app-store.module';
import AppRoutingModule from './app-routing.module';

import AppComponent from './app.component';
import FooterComponent from './components/footer/footer.component';
import NavComponent from './components/nav/nav.component';

import { models } from '@services/models';
import AuthGuard from '@services/auth-guard.service';
import DeactivateGuard from '@services/deactivate-guard.service';
import ConfigService from '@services/config.service';
import FormBuilderService from '@services/form-builder.service';
import GeoService from '@services/geo.service';
import LoggerService from '@services/logger.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppFirebaseModule,
    AppStoreModule,
    AuthModule,
    CustomersModule,
    InvoicesModule,
    StaticModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [AppComponent, FooterComponent, NavComponent],
  providers: [
    ...models,
    AuthGuard,
    DeactivateGuard,
    FormBuilderService,
    GeoService,
    LoggerService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => () => config.load(),
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export default class AppModule {}
