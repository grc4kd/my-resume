import { FirebaseAppService } from './firebase-app.service';
import { Firestore, getFirestore } from 'firebase/firestore';
import { seedMockData } from '../../../seeding/seedMockData';
import { EXPERIENCES } from '../../data/mock-experiences';
import { WEBLINK } from '../../data/mockWebLinks';
import { TestBed } from '@angular/core/testing';
import { firebaseConfig } from '../../../secrets/firebase-config';
import { initializeApp } from 'firebase/app';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { setupEmulator } from './helpers/setupEmulator';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

describe('FirebaseAppService', () => {
  let firebaseAppService: FirebaseAppService;
  initializeApp(firebaseConfig);
  const db = getFirestore();

  // To avoid tests against a cloud-hosted instance, an emulator is utilized on the same machine
  // running tests. 
  /** @var environment.useFirebaseEmulator defaults to true, when false skips emulator setup and contacts live Firestore */
  /** @link https://firebase.google.com/docs/emulator-suite/connect_firestore */
  if (environment.useFirebaseEmulator) {
    setupEmulator(db);
  }

  beforeAll(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: db },
      ],
    });

    if (environment.useFirebaseEmulator) {      
      const auth = getAuth();
      await signInAnonymously(auth)
        .then(() => {
          // Signed in..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('error #%d: %d', errorCode, errorMessage);
        });

        onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          await seedMockData(db, uid);
        } else {
          // User is signed out
          // ...
        }
      });
    }

    if (!environment.useFirebaseEmulator) {
      const firebaseAppServiceSpy = jasmine.createSpyObj('FirebaseAppService', ['getGitHubLink', 'getExperiences']);
      firebaseAppServiceSpy.getGitHubLink.and.returnValue(of(WEBLINK));
      firebaseAppServiceSpy.getExperiences.and.returnValue(of(EXPERIENCES));
      
      TestBed.overrideProvider(FirebaseAppService, {useValue: firebaseAppServiceSpy});
    }

    firebaseAppService = TestBed.inject(FirebaseAppService);
  });

  // these tests use an emulator in development, and a spy in workflow with pre-defined mock data
  it('should return a link to GitHub', (done: DoneFn) => {
    firebaseAppService.getGitHubLink().subscribe({
      next: (webLink) => {
        // compare actual and expected objects without considering the `author_uid` field
        const expectedWebLink = WEBLINK;
        webLink.author_uid = '';
        expectedWebLink.author_uid = ''
        
        expect(webLink).toBeDefined();
        expect(webLink).toEqual(expectedWebLink);
        
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
          
          const expectedExperienceObj = expectedExperiences.find(e => e.title === experience.title && e.startDate?.toMillis() === expectedStartTime && e.endDate?.toMillis() === expectedEndTime);
          if (expectedExperienceObj)
          {
            experience.author_uid = '';
            expectedExperienceObj.author_uid = '';
          }

          expect(expectedExperienceObj).toBeDefined();
          expect(experience).toEqual(expectedExperienceObj!);
        });

        done();
      },
      error: done.fail
    });
  });
});


