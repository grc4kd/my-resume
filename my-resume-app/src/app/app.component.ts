import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Firestore, getFirestore } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import { ExperiencesComponent } from './experiences/experiences.component';
import { FirebaseAppService } from './services/firebase-app.service';
import { SvgIconService } from './services/svg-icon.service';
import { firebaseConfig } from '../../secrets/firebase-config';
import { appCheckSiteKey } from '../../secrets/app-check-config';
import { environment } from '../environments/environment';
import { setupEmulator } from './services/helpers/setupEmulator';

const app = initializeApp(firebaseConfig);

setupAppCheck();

const db: Firestore = getFirestore();

if (environment.useFirebaseEmulator) {
  setupEmulator(db);
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [MatToolbarModule, MatIconModule, ExperiencesComponent]
})
export class AppComponent implements OnInit {
  title = 'my-resume-app';
  gitHubUrl = '';

  constructor(private firebaseAppService: FirebaseAppService) {
    inject(SvgIconService);
  }

  ngOnInit(): void {
    this.firebaseAppService.getGitHubLink().subscribe((webLink) => {
      this.gitHubUrl = webLink.url;
    });
  }
}

function setupAppCheck() {
  if (!environment.useAppCheck && environment.production) {
    console.warn(
      `Firebase App "${app.name}": App Check has been disabled. Please turn it back on.`
    );
  }

  // Use debug tokens for App Check in debug builds for localhost and CI
  if (environment.useAppCheck) {
    // when true, debug token env configuration will emit a debug token in the JavaScript console
    // which can then be set up in Firebase - App Check console
    let appCheckDebugToken: boolean | string =
      environment.useAppCheckDebugToken;

    // CI environments require generated token from Firebase - App Check console
    if (environment.useCIAppCheckDebugToken) {
      // load App Check CI debug token from the CI Node.js environment's global variables
      if (Object.keys(globalThis).includes('APP_CHECK_DEBUG_TOKEN_FROM_CI')) {
        const appCheckDebugTokenFromCI = Object.values(globalThis).find(
          (gb) => gb === 'APP_CHECK_DEBUG_TOKEN_FROM_CI'
        );

        // App Check debug token should be a GUID, but just check that it isn't the empty string
        if (
          typeof appCheckDebugTokenFromCI === 'string' &&
          appCheckDebugTokenFromCI.length === 0
        ) {
          appCheckDebugToken = Object.values(globalThis).find(
            (gb) => gb === 'APP_CHECK_DEBUG_TOKEN_FROM_CI'
          );
          console.info(
            'The App Check debug token was loaded from the CI environment.'
          );
        } else {
          console.error(
            'The debug token could not be loaded from the CI environment.'
          );
        }
      }
    }

    // The globalThis global property allows one to access the global object regardless of the current environment.
    Object.defineProperty(globalThis, 'FIREBASE_APPCHECK_DEBUG_TOKEN', {
      value: appCheckDebugToken,
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
      isTokenAutoRefreshEnabled: true,
    });
  }
}
