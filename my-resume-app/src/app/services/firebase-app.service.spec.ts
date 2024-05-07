import { FirebaseAppService } from './firebase-app.service';
import { WebLink } from '../../data/webLink';
import { EXPERIENCES } from '../../data/mock-experiences';
import { Firestore, connectFirestoreEmulator, doc, getFirestore, setDoc, writeBatch } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../secrets/firebase-config';
import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';

describe('FirebaseAppService', () => {
  const datePipe = new DatePipe('en-US', undefined, { dateFormat: 'y-MM-dd' });
  const expectedLink: WebLink = { url: 'https://github.com' };

  let firebaseAppService: FirebaseAppService;

  beforeAll(async () => {
    const db = getFirestore(initializeApp(firebaseConfig));

    /* 
     * To avoid tests against a cloud-hosted instance, an emulator is utilized on the same machine 
     * running tests. 
     * For more information see: Connect your app to the Cloud Firestore Emulator:
     * https://firebase.google.com/docs/emulator-suite/connect_firestore */
    connectFirestoreEmulator(db, '127.0.0.1', 8080);

    // set test documents in emulator database
    await setDoc(doc(db, 'web-links', 'github'), expectedLink);

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
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: getFirestore(initializeApp(firebaseConfig)) }
      ]
    });

    firebaseAppService = TestBed.inject(FirebaseAppService);
  });

  it('should return a link to GitHub', (done: DoneFn) => {
    firebaseAppService.GitHubLink.subscribe({
      next: (link) => {
        expect(link).toEqual(expectedLink);
        done();
      },
      error: (err) => fail(err)
    });
  });

  it('should return data for work experiences', (done: DoneFn) => {
    const expectedExperiences = EXPERIENCES;

    firebaseAppService.WorkExperiences.subscribe({
      next: (experiences) => {
        expect(experiences.length).toBeGreaterThan(0);

        experiences.forEach((experience) => {
          const expectedStartTime = experience.startDate.toMillis();
          const expectedEndTime = experience.endDate.toMillis();
          const expected = expectedExperiences.find(e => e.title === experience.title && e.startDate.toMillis() === expectedStartTime && e.endDate.toMillis() === expectedEndTime);
          expect(expected).toBeDefined();

          // narrow type after test for defined
          if (expected) {
            expect(experience).toEqual(expected);
          }
        });
        done();
      },
      error: (err) => fail(err)
    });
  });
});
