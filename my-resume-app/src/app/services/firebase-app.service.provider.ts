
import { Firestore } from "firebase/firestore";
import { FirebaseAppService } from "./firebase-app.service";

const firebaseAppServiceFactory = (db: Firestore) => {
    return new FirebaseAppService(db);
}

export const firebaseAppServiceProvider = {
    provide: FirebaseAppService,
    useFactory: firebaseAppServiceFactory,
    deps: [Firestore]
}