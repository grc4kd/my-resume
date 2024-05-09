import { Injectable } from "@angular/core";

import { Observable, Subject } from "rxjs";
import { Firestore, collection, doc, getDoc, getDocs } from "firebase/firestore";

import { WebLink } from "../../data/webLink";
import { Experience } from "../../data/experience";

@Injectable({
    providedIn: 'root',
})
export class FirebaseAppService {
    gitHubLinkSubject: Subject<WebLink> = new Subject();
    experiencesSubject: Subject<Experience[]> = new Subject();

    constructor(db: Firestore) {
        const webLinkDocRef = doc(db, "web-links", "github");
        getDoc(webLinkDocRef).then(
            (webLinkDocSnap) => {
                if (webLinkDocSnap.exists()) {
                    const webLink = webLinkDocSnap.data() as WebLink;
                    this.gitHubLinkSubject.next(webLink);
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
    get GitHubLink$(): Observable<WebLink> {
        return this.gitHubLinkSubject.asObservable();
    }

    // get work experience data from Firebase
    get WorkExperiences$(): Observable<Experience[]> {
        return this.experiencesSubject.asObservable();
    }
}