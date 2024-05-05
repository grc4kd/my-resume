import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FirebaseAppService } from './services/firebase-app.service';
import { of } from 'rxjs';
import { EXPERIENCES } from '../data/mock-experiences';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const testGitHubLink = {url: 'https://github.com'};

    /**
     * a fake FirebaseAppService with a spy for getting GitHub link
     * and a spy for getting work experiences
     */
    const firebaseAppService = jasmine.createSpyObj('FirebaseAppService', ['getGitHubLink', 'getWorkExperiences']);
    firebaseAppService.getGitHubLink.and.returnValue(of(testGitHubLink));
    firebaseAppService.getWorkExperiences.and.returnValue(of(EXPERIENCES));

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: FirebaseAppService, useValue: firebaseAppService }]
    }).compileComponents();

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

  it('should have an empty string in webLink data before input properties are set', () => {
    expect(component.gitHubLinkUrl).toBe('');
  });

  it('should have initialized the webLink data from Firebase after input properties are set', () => {
    fixture.detectChanges()
    expect(component.gitHubLinkUrl).toBeDefined();
  });
});
