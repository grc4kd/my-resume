import { Injectable } from "@angular/core";

import { Firestore, collection, doc, getDoc, getDocs, query } from "firebase/firestore";

import { WebLink } from "../../data/webLink";
import { Experience } from "../../data/experience";

@Injectable({
    providedIn: 'root',
})
export class FirebaseAppService {
    gitHubLink: WebLink = { url: '' };
    workExperiences: Experience[] = [];

    constructor(private db: Firestore) {
        this.initializeData();
    }

    async initializeData() {
        const gitHubDocRef = doc(this.db, "web-links", "github");
        const docSnap = await getDoc(gitHubDocRef);

        if (docSnap.exists()) {
            this.gitHubLink = docSnap.data() as WebLink;
        }

        const q = query(collection(this.db, "experiences"));
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            this.workExperiences.push(doc.data() as Experience);
        });
    }
}