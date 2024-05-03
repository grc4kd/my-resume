import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Your web app's Firebase configuration, these secrets will be accessible by the browser when deployed
import { firebaseConfig } from "../../secrets/firebase-config";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))), 
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
