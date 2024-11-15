import { Injectable } from "@angular/core";

import { collection, doc, getDoc, getDocs, getFirestore, query } from "firebase/firestore";

import { WebLink } from "../../data/webLink";
import { Experience } from "../../data/experience";
import { Observable, filter, from, map } from "rxjs";
import { setupEmulator } from "./helpers/setupEmulator";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class FirebaseAppService {
    private db = getFirestore();

    constructor() {        
        if (environment.useFirebaseEmulator) {
            setupEmulator(this.db);
        }
    }

    public getGitHubLink(): Observable<WebLink> {
        return from(getDoc(doc(this.db, "web-links", "github")))
        .pipe(
            filter(docSnap => docSnap.exists()),
            map(docSnap => docSnap.data() as WebLink)
        );
    }

    public getExperiences(): Observable<Experience[]> {        
        return from(getDocs(query(collection(this.db, "experiences"))))
        .pipe(
            map(querySnapshot => {
                const workExperiences: Experience[] = [];
                
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    workExperiences.push(doc.data() as Experience);
                });

                return workExperiences;
            })
        );
    }
}