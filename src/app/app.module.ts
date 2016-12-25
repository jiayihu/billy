import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import AuthModule from '../features/auth/auth.module';
import CustomersModule from '../features/customers/customers.module';
import InvoicesModule from '../features/invoices/invoices.module';
import StaticModule from '../features/static/static.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

import AppRoutingModule from './app-routing.module';

import AppComponent from './app.component';
import FooterComponent from './components/footer/footer.component';
import NavComponent from './components/nav/nav.component';

import StoreService from '../services/store.service';
import FormBuilderService from '../services/form-builder.service';
import GeoService from '../services/geo.service';
import LoggerService from '../services/logger.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    CustomersModule,
    InvoicesModule,
    StaticModule,
    AppRoutingModule,
    SimpleNotificationsModule,
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
  ],
  providers: [StoreService, FormBuilderService, GeoService, LoggerService],
  bootstrap: [AppComponent],
})
export default class AppModule {

}
