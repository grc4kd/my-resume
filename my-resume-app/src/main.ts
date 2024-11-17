import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { setupAppCheck } from '../app-check/setupAppCheck';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../secrets/firebase-config';

initializeApp(firebaseConfig);

setupAppCheck();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
