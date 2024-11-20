import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import { Seeder } from "./seed/seeder";

import { firebaseConfig } from "../my-resume-app/secrets/firebase-config";

initializeApp({
  credential: applicationDefault(),
  projectId: firebaseConfig.projectId
});

const db = getFirestore();

const seeder = new Seeder(db);
seeder.PopulateDatabase().then(
  () => {
    console.log(`Database seeded: ${db.databaseId}`);
  },
  (reason) => {
    console.log(`Database seeding function failed: ${reason}`);
  }
);
