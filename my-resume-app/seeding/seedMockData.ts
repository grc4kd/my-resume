import { EXPERIENCES } from '../src/data/mock-experiences';
import { Firestore, collection, doc, getDoc, setDoc, writeBatch, getCountFromServer } from 'firebase/firestore';
import { DatePipe } from '@angular/common';
import { WEBLINK } from '../src/data/mockWebLinks';

const datePipe = new DatePipe('en-US', undefined, { dateFormat: 'y-MM-dd' });

/**
 * Seed mock data from the source code mock data information.
 * @param db {Firestore} a Firestore database that can be hosted on Google Cloud or using the local emulator
 */
export async function seedMockData(db: Firestore, uid: string) {
  const webLink = WEBLINK;
  
  // overload user id while seeding data, passing in an id returned from Firebase Auth
  webLink.author_uid = uid;

  // check existing documents before writing seeded data
  getDoc(doc(db, "web-links", "github")).then((snap) => {
    if (!snap.exists()) {
      setDoc(doc(db, 'web-links', 'github'), webLink);
    }
  });

  // just check for an existing document in the experiences collection before loading
  getCountFromServer(collection(db, "experiences")).then(async (snap) => {
    if (snap.data().count == 0) {
      const batch = writeBatch(db);
      EXPERIENCES.forEach(experience => {
        const whitespaceRegex = /\s/gi;
        const experienceTitleFormat = experience.title?.replaceAll(whitespaceRegex, '-').toLowerCase();
        const startDateFormat = datePipe.transform(experience.startDate?.toDate());
        const endDateFormat = datePipe.transform(experience.endDate?.toDate());
    
        experience.author_uid = uid;
    
        batch.set(doc(db, "experiences",
          `mock-${experienceTitleFormat}-${startDateFormat}-${endDateFormat}`), experience);
      });
    
      await batch.commit();
    }
  });  
}
