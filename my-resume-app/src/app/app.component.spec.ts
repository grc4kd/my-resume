import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FirebaseAppService } from './services/firebase-app.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { defer, of } from 'rxjs';
import { EXPERIENCES } from '../data/mock-experiences';

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('AppComponent', () => {
  const testGitHubLink = { url: 'https://github.com/' };

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let gitHubLinkEl: HTMLAnchorElement;

  const firebaseAppServiceSpy = jasmine.createSpyObj('FirebaseAppService', ['getGitHubLink', 'getExperiences']);
  firebaseAppServiceSpy.getGitHubLink.and.returnValue(of(testGitHubLink));
  firebaseAppServiceSpy.getExperiences.and.returnValue(of(EXPERIENCES));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(), 
        provideHttpClientTesting()
      ]
    });

    TestBed.overrideProvider(FirebaseAppService, {useValue: firebaseAppServiceSpy});

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'my-resume-app' title`, () => {
    fixture.detectChanges();
    expect(component.title).toEqual('my-resume-app');
  });

  it('should have initialized the webLink data from Firebase after input properties are set', waitForAsync(() => {
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      gitHubLinkEl = fixture.nativeElement.querySelector('.github-link');
      
      expect(gitHubLinkEl.href).toBe(testGitHubLink.url);
    })

  }));
});
