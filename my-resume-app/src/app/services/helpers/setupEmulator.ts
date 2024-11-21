import { initializeApp } from 'firebase/app';
import {
  connectFirestoreEmulator,
  EmulatorMockTokenOptions,
  Firestore,
  getFirestore,
} from 'firebase/firestore';
import { firebaseConfig } from '../../../../secrets/firebase-config';

type FirestoreEmulatorConnectionError = {
  error: 'rejected' | 'bad_request';
  reason: string;
};

/***
 * Set up the Firestore emulator using default settings and return the database Firestore object
 * @returns {Firestore} an initialized Firestore instance object with settings for local emulation
 */
export function setupEmulator(): Firestore | FirestoreEmulatorConnectionError {
  const mockUserToken: EmulatorMockTokenOptions = {
    sub: 'FirestoreMockUserToken',
    provider_id: 'anonymous',
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log('Running firestore emulator during ng test');
  console.log(
    `machine window.location.hostname === ${globalThis.location.hostname}`
  );
  try {
    connectFirestoreEmulator(db, 'localhost', 8080, { mockUserToken });
    return db;
  } catch {
    const reason = `App Name: ${
      app.name
    }, Mock User Token: ${mockUserToken}\nFirestore object: ${db.toJSON()}`;

    console.error('Error connecting to Firestore Emulator.' + reason);
    return { error: 'rejected', reason };
  }
}
