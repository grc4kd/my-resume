import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { appCheckSiteKey } from '../../secrets/app-check-config';
import { environment } from '../environments/environment';
import { AppCheckDebugToken, app } from './app.component';

export function setupAppCheck() {
  // Use debug tokens for App Check in debug builds for localhost and CI
  if (environment.useAppCheckDebugToken) {
    // when true, debug token env configuration will emit a debug token in the JavaScript console
    // which can then be set up in Firebase - App Check console
    // CI environments require generated token from Firebase - App Check console in the same environment variable
    // The globalThis global property allows one to access the global object regardless of the current environment.
    Object.defineProperty(globalThis, AppCheckDebugToken.name, {
      value: environment.useAppCheckDebugToken,
      enumerable: false,
      configurable: true,
      writable: true,
    });

    // Reload to local scope and report if environment variables are loaded in Node.js environment
    const localAppCheckState = loadAppCheckEnv();

    if (localAppCheckState.appCheckDebugGlobalState === false) {
      console.error(
        `App Check debug token could not be loaded into global object during function ${setupAppCheck.name}`
      );
    }

    if (localAppCheckState.appCheckDebugGlobalState !== false) {
      console.info(
        `App Check debug token was succesfully loaded into globalThis.${AppCheckDebugToken.name} during function ${setupAppCheck.name}()`
      );
    }
  }

  appCheckDebugTokenFailSafe();

  if (environment.useAppCheck || environment.production) {
    // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
    // key is the counterpart to the secret key you set in the Firebase console.
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey),

      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed.
      isTokenAutoRefreshEnabled: true,
    });
  }

  const localAppCheckState = loadAppCheckEnv();

  if (
    environment.production === false &&
    localAppCheckState.appCheckDebugGlobalState === false
  ) {
    console.error(
      `Firebase App Check debug token ${AppCheckDebugToken.name} is set to ${localAppCheckState.appCheckDebugGlobalState} and production = ${environment.production}.`
    );
  }
}

function loadAppCheckEnv(): {
  appCheckDebugGlobalIndex: number;
  appCheckDebugGlobalState: boolean | string;
} {
  return {
    appCheckDebugGlobalIndex: Object.keys(globalThis).indexOf(
      AppCheckDebugToken.name
    ),
    appCheckDebugGlobalState: Object.values(globalThis).at(
      Object.keys(globalThis).indexOf(AppCheckDebugToken.name)
    ),
  };
}

/**
 * Production Environment Fail-safe settings
 * @summary
 * 1. enables App Check environment
 *  While disabled, App Check does not protect the application from abusive traffic and unverified parties.
 *  While enabled, App Check uses recaptcha to provide access to Firebase resources from verified apps.
 * 2. disables App Check debug token
 *  While enabled, the App Check debug token indicates that the application allows access to your Firebase resources from unverified devices.
 *  While disabled, App Check will not use a debug token and instead will be authorized by App Check. Enforcement will deny any unverified inbound sessions.
 */
function appCheckDebugTokenFailSafe() {
  if (environment.production) {
    Object.defineProperty(globalThis, AppCheckDebugToken.name, {
      value: false,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  // also display an error to catch the attention of anyone looking in the browser Console log.
  if (!environment.useAppCheck && environment.production) {
    console.error(
      `Firebase App "${app.name}": App Check has been disabled. Please turn it back on.`
    );
  }
}
