
import { FirebaseAppService } from './firebase-app.service';
import { Firestore, connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { seedMockData } from '../../../seeding/seedMockData';
import { EXPERIENCES } from '../../data/mock-experiences';
import { WEBLINK } from '../../data/mockWebLinks';
import { TestBed } from '@angular/core/testing';
import { firebaseAppServiceProvider } from './firebase-app.service.provider';
import { firebaseConfig } from '../../../secrets/firebase-config';
import { initializeApp } from 'firebase/app';

describe('FirebaseAppService', () => {
  initializeApp(firebaseConfig);
  const db = getFirestore();

  // To avoid tests against a cloud-hosted instance, an emulator is utilized on the same machine
  // running tests.

  /** @link https://firebase.google.com/docs/emulator-suite/connect_firestore */
  connectFirestoreEmulator(db, '127.0.0.1', 8080);

  let firebaseAppService: FirebaseAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: db },
        firebaseAppServiceProvider
      ],
    });

    firebaseAppService = TestBed.inject(FirebaseAppService);

    seedMockData(db);
  });

  it('should return a link to GitHub', (done: DoneFn) => {
    firebaseAppService.GitHubLink$.subscribe({
      next: (link) => {
        expect(link).toEqual(WEBLINK);
        done();
      },
      error: (err) => fail(err)
    });
  });

  it('should return data for work experiences', (done: DoneFn) => {
    const expectedExperiences = EXPERIENCES;

    firebaseAppService.WorkExperiences$.subscribe({
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

