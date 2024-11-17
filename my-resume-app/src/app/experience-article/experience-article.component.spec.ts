import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { ExperienceArticleComponent } from './experience-article.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EXPERIENCES } from '../../data/mock-experiences';
import { Experience } from '../../data/experience';

describe('ExperienceArticleComponent', () => {
  let component: ExperienceArticleComponent;
  let fixture: ComponentFixture<ExperienceArticleComponent>;
  let loader: HarnessLoader;
  let expectedExperience: Experience;

  beforeEach(async () => {
    // mock data for experience passed in from parent component
    expectedExperience = EXPERIENCES[0];

    await TestBed.configureTestingModule({
      imports: [ExperienceArticleComponent, NoopAnimationsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExperienceArticleComponent);

    component = fixture.componentInstance;
    component.experience = expectedExperience;

    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have experience data loaded from mock data', () => {
    expect(component.experience).toBe(expectedExperience);
  });

  it('should apply expected styles to experience dates', () => {
    const experienceArticleEl: HTMLElement = fixture.nativeElement;
    const dateDiv = experienceArticleEl.querySelector('div[class="dates"]');
    const styleMap = dateDiv?.computedStyleMap();
    const paddingTop = styleMap?.get('padding-top');

    expect((paddingTop as CSSUnitValue).value).toBeGreaterThan(0);
  });

  it('should load harness for dialog', async () => {
    fixture.componentInstance.openDialog();
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
  })

  it('should be able to close dialog', async () => {
    fixture.componentInstance.openDialog();
    let dialogs = await loader.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(1);
    await dialogs[0].close();

    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(0);
  });

  it('should display the company in a header section', () => {
    const experienceArticleElement: HTMLElement = fixture.nativeElement;
    const h2 = experienceArticleElement.querySelector('h2')!;
    if (expectedExperience.company)
    {
      expect(h2.textContent).toEqual(expectedExperience.company);
    }
  });
});
