const firebase = require('firebase/app');
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA4QtWwY5Ix3uCNf_bbWajEkZlWk98-R4I',
  authDomain: 'invoich-ac0b4.firebaseapp.com',
  databaseURL: 'https://invoich-ac0b4.firebaseio.com',
  storageBucket: 'invoich-ac0b4.appspot.com',
};

firebase.initializeApp(config);
