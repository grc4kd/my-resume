import { Injectable } from "@angular/core";

import { DocumentData, DocumentSnapshot, Firestore, collection, doc, getDoc, getDocs, query } from "firebase/firestore";

import { WebLink } from "../../data/webLink";
import { Experience } from "../../data/experience";
import { Observable, filter, from, map, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class FirebaseAppService {
    constructor(private db: Firestore) {}

    public getGitHubLink(): Observable<WebLink> {
        return from(getDoc(doc(this.db, "web-links", "github")))
        .pipe(
            filter(docSnap => docSnap.exists()),
            map(docSnap => docSnap.data() as WebLink)
        );
    }

    public async getExperiences(): Promise<Experience[]> {
        const workExperiences: Experience[] = [];
        
        const experienceQuery = query(collection(this.db, "experiences"));
        const querySnapshot = await getDocs(experienceQuery);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            workExperiences.push(doc.data() as Experience);
        });

        return workExperiences;
    }
}