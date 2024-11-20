import { environment } from '../src/environments/environment';

const TOKEN_NAME = 'FIREBASE_APPCHECK_DEBUG_TOKEN';

export function setupAppCheck() {
  // Use debug tokens for App Check in debug builds for localhost and CI
  if (environment.useAppCheckDebugToken) {
    // Use CI debug token when it has already been set as
    // a Node.js runtime variable from the host environment
    if (Object.keys(globalThis).includes(TOKEN_NAME)) {
      console.info('Firebase App Check debug token is active.');
    } else {
      // load debug token from Angular environment configuration
      Object.defineProperty(globalThis, TOKEN_NAME, {
        value: environment.useAppCheckDebugToken,
        enumerable: false,
        configurable: true,
        writable: true,
      });
    }
  }
}
