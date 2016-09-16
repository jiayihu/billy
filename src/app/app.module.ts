import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import routing from './app.routes';
import AppComponent from './app.component';
import NavComponent from './components/nav.component';

import AuthModule from '../features/auth/auth.module';
import CreateInvoiceModule from '../features/create-invoice/create-invoice.module';

import StoreService from '../services/store.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    AuthModule,
    CreateInvoiceModule,
  ],
  providers: [StoreService],
  bootstrap: [AppComponent],
})
export default class AppModule {

}
