import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import AuthModule from '../features/auth/auth.module';
import CustomersModule from '../features/customers/customers.module';
import InvoicesModule from '../features/invoices/invoices.module';
import StaticModule from '../features/static/static.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

import AppRoutingModule from './app-routing.module';

import AppComponent from './app.component';
import FooterComponent from './components/footer/footer.component';
import NavComponent from './components/nav/nav.component';

import rootReducer, { IState } from '@services/reducers/';
import ModelService from '@services/model.service';
import FormBuilderService from '@services/form-builder.service';
import GeoService from '@services/geo.service';
import LoggerService from '@services/logger.service';

let initialState: IState;

try {
  initialState = JSON.parse(window.localStorage.getItem('billy-store'));
} catch (exception) {
  console.error('Something went wrong with localStorage in ModelService: ', exception);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.provideStore(rootReducer, initialState || undefined),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
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
  providers: [ModelService, FormBuilderService, GeoService, LoggerService],
  bootstrap: [AppComponent],
})
export default class AppModule {

}
