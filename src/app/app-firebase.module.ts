import { NgModule } from '@angular/core';
import { AngularFireModule, AuthMethods } from 'angularfire2';

const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  storageBucket: process.env.FIREBASE_STORAGE,
};

const authConfig = {
  method: AuthMethods.Password,
};

@NgModule({
  imports: [AngularFireModule.initializeApp(config, authConfig)],
})
export default class AppFirebaseModule {

}
