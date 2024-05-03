import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration, these secrets will be accessible by the browser when deployed
import { firebaseConfig } from "../../../secrets/firebase-config";

// allow anonymous authentication, don't forget to cleanup accounts!
import { getAuth, signInAnonymously } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();
signInAnonymously(auth)
    .then(() => {
        // Signed in..
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(`Error logging into Firebase ${errorCode}: ${errorMessage}`);
    });

@Injectable({
    providedIn: 'root',
})
export class FirebaseAppService {    
    // get a link to GitHub from Firebase
    async getGitHubLink(): Promise<string> {
        const webLinkDocRef = doc(db, 'web-links', 'github');
        const webLinkSnapshot = await getDoc(webLinkDocRef);
        
        if (webLinkSnapshot.exists()) {
            const webLinkData: string | undefined = webLinkSnapshot.get('url');
            
            return webLinkData ?? "";
        } else {
            console.error("Could not find the requested document: " + webLinkDocRef);

            return "";
        }
    }
}