import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ExperiencesComponent } from './experiences.component';
import { FirebaseAppService } from '../services/firebase-app.service';
import { EXPERIENCES } from '../../data/mock-experiences';
import { NgComponentOutlet } from '@angular/common';

const firebaseAppServiceStub: Partial<FirebaseAppService> = {
  getExperiences: () => of(EXPERIENCES)
}

describe('ExperiencesComponent', () => {
  let component: ExperiencesComponent;
  let fixture: ComponentFixture<ExperiencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExperiencesComponent, NgComponentOutlet],
      providers: [{ provide: FirebaseAppService, useValue: firebaseAppServiceStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExperiencesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should conditionally render a buffer progress-bar while loading', () => {
    expect(component.nowLoading).toBe(true);
    
    fixture.detectChanges();
    
    expect(component.nowLoading).toBe(false);
  });

  it(`should render 'Work Experience' title`, () => {
    fixture.detectChanges();

    expect(fixture.componentInstance.title).toContain('Work Experience');
  });
});
