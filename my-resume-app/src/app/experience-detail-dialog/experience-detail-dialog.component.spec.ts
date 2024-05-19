import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentExperienceDetailComponent } from './experience-detail-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EXPERIENCES } from '../../data/mock-experiences';
import { ExperienceDetail } from '../../data/experience-detail';

describe('ExperienceDetailDialogComponent', () => {
  let component: DialogContentExperienceDetailComponent;
  let fixture: ComponentFixture<DialogContentExperienceDetailComponent>;
  let expectedDialogData: ExperienceDetail;

  beforeEach(async () => {
    expectedDialogData = EXPERIENCES[0].detail;

    await TestBed.configureTestingModule({
      imports: [DialogContentExperienceDetailComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: expectedDialogData }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogContentExperienceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass dialog data to child dialog component', () => {
    expect(component.data).toBe(expectedDialogData);
  });
});
