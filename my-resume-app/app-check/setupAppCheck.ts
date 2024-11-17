import { environment } from '../src/environments/environment';

/**
 * Object literal type alias containing data about a special reserved environment variable for App Check.
 * @var name The name of the debug token environment variable from documentation.
 * @var host The online documentation host server FQDN.
 * @var filename The document from the documentation server.
 * @var version (as of 2024-11-12) A publishing tag containing a date, revision, and release candidate number
 */
const AppCheckDebugToken = {
  name: 'FIREBASE_APPCHECK_DEBUG_TOKEN',
  host: 'firebase.google.com',
  filename: '/docs/app-check/web/debug-provider',
  version: 't-devsite-webserver-20241112-r02-rc01.464830024708363737',
};

export function setupAppCheck() {
  // Use debug tokens for App Check in debug builds for localhost and CI
  if (environment.useAppCheckDebugToken) {
    // Use CI debug token when it has already been set as
    // a Node.js runtime variable from the host environment
    if (Object.keys(globalThis).includes(AppCheckDebugToken.name)) {
      console.info("Firebase App Check debug token is active.");
    } else {
      // load debug token from Angular environment configuration
      Object.defineProperty(globalThis, AppCheckDebugToken.name, {
        value: environment.useAppCheckDebugToken,
        enumerable: false,
        configurable: true,
        writable: true,
      });
    }
  }
}
