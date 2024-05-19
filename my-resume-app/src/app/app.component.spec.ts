import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FirebaseAppService } from './services/firebase-app.service';
import { EXPERIENCES } from '../data/mock-experiences';

describe('AppComponent', () => {
  const testGitHubLink = { url: 'https://github.com/' };

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let gitHubLinkEl: HTMLAnchorElement;

  const firebaseAppServiceStub: Partial<FirebaseAppService> = {
    gitHubLink: testGitHubLink,
    workExperiences: EXPERIENCES
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent]
    }).overrideProvider(FirebaseAppService, { useValue: firebaseAppServiceStub });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    gitHubLinkEl = fixture.nativeElement.querySelector('.github-link');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'my-resume-app' title`, () => {
    fixture.detectChanges();
    expect(component.title).toEqual('my-resume-app');
  });

  it('should have initialized the webLink data from Firebase after input properties are set', () => {
    expect(gitHubLinkEl.href).toBe('');
    
    fixture.detectChanges();
    expect(gitHubLinkEl.href).toBe(testGitHubLink.url);
  });
});
