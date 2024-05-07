import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesComponent } from './experiences.component';
import { FirebaseAppService } from '../services/firebase-app.service';
import { EXPERIENCES } from '../../data/mock-experiences';
import { of } from 'rxjs';

let firebaseAppServiceStub: Partial<FirebaseAppService>;
firebaseAppServiceStub = {
  WorkExperiences: of(EXPERIENCES)
}

describe('ExperiencesComponent', () => {
  let component: ExperiencesComponent;
  let fixture: ComponentFixture<ExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencesComponent],
      providers: [{ provide: FirebaseAppService, useValue: firebaseAppServiceStub }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render 'Work Experience' title`, () => {
    const fixture = TestBed.createComponent(ExperiencesComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.title).toContain('Work Experience');
  });
});
