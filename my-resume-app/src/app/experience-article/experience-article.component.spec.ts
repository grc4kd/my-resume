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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply expected styles to experience dates', () => {
    const experienceArticleEl: HTMLElement = fixture.nativeElement;
    const dateDiv = experienceArticleEl.querySelector('div[class="dates"]');
    
    expect(dateDiv !== null);
    expect(dateDiv?.computedStyleMap().get('padding') != "");
  });
});
