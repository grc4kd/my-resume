
import { FirebaseAppService } from './firebase-app.service';
import { Firestore, connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { seedMockData } from '../../../seeding/seedMockData';
import { EXPERIENCES } from '../../data/mock-experiences';
import { WEBLINK } from '../../data/mockWebLinks';
import { TestBed } from '@angular/core/testing';
import { firebaseAppServiceProvider } from './firebase-app.service.provider';
import { firebaseConfig } from '../../../secrets/firebase-config';
import { initializeApp } from 'firebase/app';
import { of } from 'rxjs';

describe('FirebaseAppService', () => {
  let firebaseAppService: FirebaseAppService;
  initializeApp(firebaseConfig);
  const db = getFirestore();

  // To avoid tests against a cloud-hosted instance, an emulator is utilized on the same machine
  // running tests.
  /** @link https://firebase.google.com/docs/emulator-suite/connect_firestore */
  if (window.location.hostname === 'localhost') {
    connectFirestoreEmulator(db, 'localhost', 8080);
  
    beforeAll(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: Firestore, useValue: db },
          firebaseAppServiceProvider
        ],
      });

      seedMockData(db);

      if (window.location.hostname !== 'localhost') {
        const firebaseAppServiceSpy = jasmine.createSpyObj('FirebaseAppService', ['getGitHubLink', 'getExperiences']);
        firebaseAppServiceSpy.getGitHubLink.and.returnValue(of(WEBLINK));
        firebaseAppServiceSpy.getExperiences.and.returnValue(of(EXPERIENCES));
        
        TestBed.overrideProvider(firebaseAppServiceProvider, {useValue: firebaseAppServiceSpy});
      }

      firebaseAppService = TestBed.inject(FirebaseAppService);
    });
  }

  // these tests are disabled for CI runner, could replace with mocks or emulators
  it('should return a link to GitHub', (done: DoneFn) => {
    firebaseAppService.getGitHubLink().subscribe({
      next: (gitHubLink) => {
        expect(gitHubLink).toEqual(WEBLINK);
        done();
      },
      error: done.fail,
    });
  });

  it('should return data for work experiences', (done: DoneFn) => {
    const expectedExperiences = EXPERIENCES;

    firebaseAppService.getExperiences().subscribe({
      next: (experiences) => {
        expect(experiences.length).toBeGreaterThan(0);
    
        experiences.forEach((experience) => {
          const expectedStartTime = experience.startDate?.toMillis();
          const expectedEndTime = experience.endDate?.toMillis();
          const expected = expectedExperiences.find(e => e.title === experience.title && e.startDate?.toMillis() === expectedStartTime && e.endDate?.toMillis() === expectedEndTime);
          expect(expected).toBeDefined();
    
          // narrow type after test for defined
          if (expected) {
            expect(experience).toEqual(expected);
          }
        });

        done();
      },
      error: done.fail
    });
  });
});

