import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceArticleComponent } from './experience-article.component';

describe('ExperienceArticleComponent', () => {
  let component: ExperienceArticleComponent;
  let fixture: ComponentFixture<ExperienceArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperienceArticleComponent);
    component = fixture.componentInstance;
    // mock data for experience passed in from parent component
    const expectedExperience = {
      title: "Software Developer",
      description: `A person who designs and creates software to produce a desired output by composing programs from 
      existing libraries and programming languages, often resulting in the creation of new computer source code.`,
      company: "Mastco",
      startDate: new Date(2001, 0, 1),
      endDate: new Date(2001, 11, 31)
    };
    component.experience = expectedExperience;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply expected styles to experience dates', () => {
    const experienceArticleEl: HTMLElement = fixture.nativeElement;
    const dateDiv = experienceArticleEl.querySelector('div[class="dates"]');    
    const styleMap = dateDiv?.computedStyleMap();
    const paddingTop = styleMap?.get('padding-top');

    expect((paddingTop as CSSUnitValue).value).toBeGreaterThan(0);
  });
});
