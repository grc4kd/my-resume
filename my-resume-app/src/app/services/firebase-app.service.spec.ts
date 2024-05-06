import { FirebaseAppService } from './firebase-app.service';
import { WebLink } from '../../data/webLink';
import { defer } from 'rxjs';
import { EXPERIENCES } from '../../data/mock-experiences';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../secrets/firebase-config';
import { TestBed } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('FirebaseAppService', () => {
  /** 
   * @description To avoid tests against a cloud-hosted instance, an emulator is utilized on the same machine 
   * running tests. 
   * @link [Connect your app to the Cloud Firestore Emulator](https://firebase.google.com/docs/emulator-suite/connect_firestore) */ 
  let firebaseAppService: FirebaseAppService;

  beforeAll(() => {
    initializeApp(firebaseConfig);
    const db = getFirestore();
    connectFirestoreEmulator(db, '127.0.0.1', 8080);

    TestBed.configureTestingModule({ providers: [
      importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
      importProvidersFrom(provideFirestore(() => getFirestore())),
      FirebaseAppService
    ]});
    firebaseAppService = TestBed.inject(FirebaseAppService);
  });

  it('should return a link to GitHub', (done: DoneFn) => {
    const expectedLink: WebLink = {
      url: 'https://github.com'
    };

    firebaseAppService.getGitHubLink().subscribe({
      next: (link) => {
        expect(link).toEqual(expectedLink);
        done();
      },
      error: done.fail,
    });
  });

  it('should return data for work experiences', (done: DoneFn) => {
    const expectedExperiences = EXPERIENCES;

    firebaseAppService.getWorkExperiences().subscribe({
      next: (experiences) => {
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
      error: done.fail
    });
  });
});
