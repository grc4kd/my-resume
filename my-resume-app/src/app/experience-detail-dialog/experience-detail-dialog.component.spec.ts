import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentExperienceDetail } from './experience-detail-dialog.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ExperienceDetailDialogComponent', () => {
  let component: DialogContentExperienceDetail;
  let fixture: ComponentFixture<DialogContentExperienceDetail>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogContentExperienceDetail],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogContentExperienceDetail);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
