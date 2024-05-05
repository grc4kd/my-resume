import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentExperienceDetail } from './experience-detail-dialog.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Inject, InjectionToken } from '@angular/core';
import { Experience } from '../../data/experience';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EXPERIENCES } from '../../data/mock-experiences';
import { ExperienceDetail } from '../../data/experience-detail';

describe('ExperienceDetailDialogComponent', () => {
  let component: DialogContentExperienceDetail;
  let fixture: ComponentFixture<DialogContentExperienceDetail>;
  let loader: HarnessLoader;
  let expectedDialogData: ExperienceDetail;

  beforeEach(async () => {
    expectedDialogData = EXPERIENCES[0].detail;

    await TestBed.configureTestingModule({
      imports: [DialogContentExperienceDetail],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: expectedDialogData}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogContentExperienceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass dialog data to child dialog component', () => {
    expect(component.data).toBe(expectedDialogData);
  });
});
