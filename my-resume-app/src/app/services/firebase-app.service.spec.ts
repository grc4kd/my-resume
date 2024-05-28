
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
  let firebaseAppService: FirebaseAppService;
  initializeApp(firebaseConfig);
  const db = getFirestore();

  // To avoid tests against a cloud-hosted instance, an emulator is utilized on the same machine
  // running tests.
  /** @link https://firebase.google.com/docs/emulator-suite/connect_firestore */
  console.log(window.location.hostname);
  if (window.location.hostname === 'localhost') {
    connectFirestoreEmulator(db, 'localhost', 8080);
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: db },
        firebaseAppServiceProvider
      ],
    });
    firebaseAppService = TestBed.inject(FirebaseAppService);
    
    // checking hostname again to run inside beforeEach async zone
    if (window.location.hostname === 'localhost') {
      await seedMockData(db);
    }
  })

  // these tests are disabled for CI runner, could replace with mocks or emulators
  it('should return a link to GitHub', () => {
    expect(firebaseAppService.gitHubLink).toEqual(WEBLINK);
  });

  it('should return data for work experiences', () => {
    const expectedExperiences = EXPERIENCES;

    expect(firebaseAppService.workExperiences.length).toBeGreaterThan(0);

    firebaseAppService.workExperiences.forEach((experience) => {
      const expectedStartTime = experience.startDate?.toMillis();
      const expectedEndTime = experience.endDate?.toMillis();
      const expected = expectedExperiences.find(e => e.title === experience.title && e.startDate?.toMillis() === expectedStartTime && e.endDate?.toMillis() === expectedEndTime);
      expect(expected).toBeDefined();

      // narrow type after test for defined
      if (expected) {
        expect(experience).toEqual(expected);
      }
    });
  });
});

