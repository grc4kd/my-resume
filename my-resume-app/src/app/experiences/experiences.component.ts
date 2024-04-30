import { Component } from '@angular/core';
import { EXPERIENCES } from '../../mock-experiences';
import { Experience } from '../../experience';
import { ExperienceArticleComponent } from '../experience-article/experience-article.component';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [ExperienceArticleComponent],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent {
  title = "Work Experience";
  experiences: Experience[] = EXPERIENCES;
}
