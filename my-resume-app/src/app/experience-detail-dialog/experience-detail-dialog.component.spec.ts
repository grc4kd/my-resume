import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentExperienceDetail } from './experience-detail-dialog.component';

describe('ExperienceDetailDialogComponent', () => {
  let component: DialogContentExperienceDetail;
  let fixture: ComponentFixture<DialogContentExperienceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogContentExperienceDetail]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogContentExperienceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
