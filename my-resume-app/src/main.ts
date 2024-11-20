import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { setupAppCheck } from '../app-check/setupAppCheck';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../secrets/firebase-config';
import { appCheckSiteKey } from '../secrets/app-check-config';

const app = initializeApp(firebaseConfig);

// always setup app check
setupAppCheck();

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(appCheckSiteKey),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
})

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
