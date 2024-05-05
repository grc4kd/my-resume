import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';

import { Experience } from "../../data/experience";
import { Observable } from "rxjs";
import { WebLink } from "../../data/webLink";

@Injectable({
    providedIn: 'root',
})
export class FirebaseAppService {    
    firestore: Firestore = inject(Firestore);

    // get a link to GitHub from Firebase
    getGitHubLink(): Observable<WebLink> {
        const webLinkDoc = doc(this.firestore, "web-links/github");
        return docData(webLinkDoc) as Observable<WebLink>
    }

    // get work experience data from Firebase
    getWorkExperiences(): Observable<Experience[]> {
        const experienceDocs = collection(this.firestore, "experiences");
        return collectionData(experienceDocs) as Observable<Experience[]>;
    }
}