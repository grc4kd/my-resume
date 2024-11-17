import { Firestore, connectFirestoreEmulator } from 'firebase/firestore';

let emulatorConnected: boolean = false;

export function setupEmulator(db: Firestore) {
  // Firestore settings can not be changed after the Firestore object has already been started
  // use a local flag to set up the emulator once, handling the test project
  if (emulatorConnected) {
    return;
  }
  
  console.log('Running firestore emulator during ng test');
  console.log(
    'machine window.location.hostname === ' + globalThis.location.hostname
  );
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    emulatorConnected = true;
  } catch {
    console.error('Error connecting to Firestore Emulator.');
  }
}
