import { EXPERIENCES } from '../src/data/mock-experiences';
import { Firestore, doc, setDoc, writeBatch } from 'firebase/firestore';
import { DatePipe } from '@angular/common';
import { WEBLINK } from '../src/data/mockWebLinks';

const datePipe = new DatePipe('en-US', undefined, { dateFormat: 'y-MM-dd' });

/**
 * Seed mock data from the source code mock data information.
 * @param db {Firestore} a Firestore database that can be hosted on Google Cloud or using the local emulator
 */
export async function seedMockData(db: Firestore) {
  // set test documents in database
  await setDoc(doc(db, 'web-links', 'github'), WEBLINK);

  const batch = writeBatch(db);
  EXPERIENCES.forEach(experience => {
    const whitespaceRegex = /\s/gi;
    let experienceTitleFormat = experience.title.replaceAll(whitespaceRegex, '-').toLowerCase();
    let startDateFormat = datePipe.transform(experience.startDate.toDate());
    let endDateFormat = datePipe.transform(experience.endDate.toDate());

    batch.set(doc(db, "experiences",
      `mock-${experienceTitleFormat}-${startDateFormat}-${endDateFormat}`), experience);
  });

  await batch.commit();
}
