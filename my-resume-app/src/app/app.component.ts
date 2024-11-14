import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { Firestore, getFirestore } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import { ExperiencesComponent } from "./experiences/experiences.component";
import { FirebaseAppService } from './services/firebase-app.service';
import { SvgIconService } from './services/svg-icon.service';
import { firebaseConfig } from '../../secrets/firebase-config';
import { appCheckSiteKey } from '../../secrets/app-check-config';
import { environment } from '../environments/environment';

const app = initializeApp(firebaseConfig);

// Use debug tokens for App Check in debug builds for localhost and CI
if (environment.useAppCheck) {
  // when true, debug token env configuration will emit a debug token in the JavaScript console
  // which can then be set up in Firebase - App Check console
  const useAppCheckDebugToken: boolean | string = environment.useAppCheckDebugToken;
  let appCheckToken: string = ""
  let appCheckDebugToken: string = ""
  if (useAppCheckDebugToken && Object.values(globalThis).some(gb => gb === 'APP_CHECK_DEBUG_TOKEN'))
  {
    appCheckDebugToken = Object.values(globalThis).find(gb => gb === 'APP_CHECK_DEBUG_TOKEN');
  }
  
  if (typeof appCheckDebugToken === "string") {
    appCheckToken = appCheckDebugToken;
  }

  // The globalThis global property allows one to access the global object regardless of the current environment.
  Object.defineProperty(globalThis, 
    'FIREBASE_APPCHECK_DEBUG_TOKEN', {
    value: appCheckToken,
    enumerable: false,
    configurable: true,
    writable: true,
  });
}

if (environment.useAppCheck) {
  // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
  // key is the counterpart to the secret key you set in the Firebase console.
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(appCheckSiteKey),
  
    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
  });
}

const db = getFirestore();

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    MatToolbarModule,
    MatIconModule,
    ExperiencesComponent,
  ],
  providers: [
    { provide: Firestore, useValue: db }
  ]
})
export class AppComponent implements OnInit {
  title = 'my-resume-app';
  gitHubUrl = '';

  private firebaseAppService = inject(FirebaseAppService);

  constructor() {
    inject(SvgIconService);
  }

  ngOnInit(): void {
    this.firebaseAppService.getGitHubLink().subscribe(webLink => {
      this.gitHubUrl = webLink.url
    });
  }
}
