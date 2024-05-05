import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { ExperienceArticleComponent } from './experience-article.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EXPERIENCES } from '../../data/mock-experiences';
import { Experience } from '../../data/experience';
import { MatDialogConfig } from '@angular/material/dialog';

describe('ExperienceArticleComponent', () => {
  let component: ExperienceArticleComponent;
  let fixture: ComponentFixture<ExperienceArticleComponent>;
  let loader: HarnessLoader;
  let expectedExperience: Experience;
  let matDialogConfig: MatDialogConfig;

  beforeEach(async () => {
    // mock data for experience passed in from parent component
    expectedExperience = EXPERIENCES[0];

    // use dialog config to inject data rather than the application root injector
    matDialogConfig = new MatDialogConfig();
    matDialogConfig.data = expectedExperience.detail;

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
    fixture.componentInstance.openDialog(matDialogConfig);
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
  })

  it('should be able to close dialog', async () => {
    fixture.componentInstance.openDialog(matDialogConfig);
    let dialogs = await loader.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(1);
    await dialogs[0].close();

    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(0);
  });
});
