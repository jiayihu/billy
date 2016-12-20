import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import AuthModule from '../features/auth/auth.module';
import CreateInvoiceModule from '../features/create-invoice/create-invoice.module';
import CustomersModule from '../features/customers/customers.module';
import InvoicesModule from '../features/invoices/invoices.module';

import routing from './app.routes';
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
    routing,
    AuthModule,
    CreateInvoiceModule,
    CustomersModule,
    InvoicesModule,
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
