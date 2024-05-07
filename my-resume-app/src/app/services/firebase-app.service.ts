import { Injectable } from "@angular/core";

import { Observable, Subject } from "rxjs";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../secrets/firebase-config";

import { WebLink } from "../../data/webLink";
import { Experience } from "../../data/experience";

@Injectable({
    providedIn: 'root',
})
export class FirebaseAppService {
    gitHubLinkSubject = new Subject<WebLink>();
    experiencesSubject = new Subject<Experience[]>();

    constructor() {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        
        const webLinkDocRef = doc(db, "web-links", "github");
        getDoc(webLinkDocRef).then(
            (webLinkDocSnap) => {
                if (webLinkDocSnap.exists()) {
                    const webLinkAsWebLink = webLinkDocSnap.data() as WebLink;
                    this.gitHubLinkSubject.next(webLinkAsWebLink);
                }
            }
        );

        const experienceColRef = collection(db, "experiences");
        getDocs(experienceColRef).then(
            (experienceDocs) => {
                this.experiencesSubject.next(experienceDocs.docs.map(doc => doc.data() as Experience));
            }
        );
    }

    // get a link to GitHub from Firebase
    get GitHubLink(): Observable<WebLink> {
        return this.gitHubLinkSubject.asObservable();
    }

    // get work experience data from Firebase
    get WorkExperiences(): Observable<Experience[]> {
        return this.experiencesSubject.asObservable();
    }
}