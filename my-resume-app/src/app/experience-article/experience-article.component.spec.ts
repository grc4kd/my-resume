import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

import { ExperienceArticleComponent } from './experience-article.component';
import { Timestamp } from 'firebase/firestore';
import { HarnessLoader } from '@angular/cdk/testing';

describe('ExperienceArticleComponent', () => {
  let component: ExperienceArticleComponent;
  let fixture: ComponentFixture<ExperienceArticleComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperienceArticleComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;

    // mock data for experience passed in from parent component
    const expectedExperience = {
      title: "Software Developer",
      description: `A person who designs and creates software to produce a desired output by composing programs from 
      existing libraries and programming languages, often resulting in the creation of new computer source code.`,
      company: "Mastco",
      startDate: Timestamp.fromDate(new Date(2001, 0, 1)),
      endDate: Timestamp.fromDate(new Date(2001, 11, 31)),
      detail: {
        title: "Software Developer Detail",
        subtitle: "Full-Stack Developer",
        description: `A full-stack developer is a type of software developer that specializes in broad knowledge about 
        multiple software layers. This type of developer can typically be found delving deeply into a few subjects at a 
        time, while also prioritizing total business value above specific implementation details. However, this doesn't 
        mean that they aren't aware of the risks and benefits of clean code. On the contrary, sometimes their most 
        pressing responsibility is deciding where to expend the most effort and discipline.`
      }
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
