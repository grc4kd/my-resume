import { Component, Input } from '@angular/core';
import { Experience } from '../../experience';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-experience-article',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './experience-article.component.html',
  styleUrl: './experience-article.component.css'
})
export class ExperienceArticleComponent {
  @Input() experience?: Experience;
}
