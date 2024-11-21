import { FirebaseAppService } from './firebase-app.service';
import { Firestore, getFirestore } from 'firebase/firestore';
import { EXPERIENCES } from '../../data/mock-experiences';
import { WEBLINK } from '../../data/mockWebLinks';
import { TestBed } from '@angular/core/testing';
import { firebaseConfig } from '../../../secrets/firebase-config';
import { initializeApp } from 'firebase/app';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { setupEmulator } from './helpers/setupEmulator';

describe('FirebaseAppService', () => {
  let firebaseAppService: FirebaseAppService;

  beforeAll(() => {
    const app = initializeApp(firebaseConfig);

    if (environment.useFirebaseEmulator) {
      const db = setupEmulator();

      TestBed.configureTestingModule({
        providers: [{ provide: Firestore, useValue: db }],
      });
    }

    if (!environment.useFirebaseEmulator) {
      TestBed.configureTestingModule({
        providers: [{ provide: Firestore, useValue: getFirestore(app) }],
      });

      const firebaseAppServiceSpy = jasmine.createSpyObj('FirebaseAppService', [
        'getGitHubLink',
        'getExperiences',
      ]);
      firebaseAppServiceSpy.getGitHubLink.and.returnValue(of(WEBLINK));
      firebaseAppServiceSpy.getExperiences.and.returnValue(of(EXPERIENCES));

      TestBed.overrideProvider(FirebaseAppService, {
        useValue: firebaseAppServiceSpy,
      });
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
        expectedWebLink.author_uid = '';

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
          const expectedStartTime = experience.startDate;
          const expectedEndTime = experience.endDate;

          const expectedExperienceObj = expectedExperiences.find(
            (e) =>
              e.title === experience.title &&
              e.startDate === expectedStartTime &&
              e.endDate === expectedEndTime
          );
          if (expectedExperienceObj) {
            experience.author_uid = '';
            expectedExperienceObj.author_uid = '';

            expect(experience).toEqual(expectedExperienceObj!);
          }
        });

        done();
      },
      error: done.fail,
    });
  });
});
