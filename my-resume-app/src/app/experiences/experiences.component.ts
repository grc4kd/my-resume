import { Component, OnDestroy, OnInit } from '@angular/core';
import { EXPERIENCES } from '../../data/mock-experiences';
import { Experience } from '../../data/experience';
import { ExperienceArticleComponent } from '../experience-article/experience-article.component';
import { FirebaseAppService } from '../services/firebase-app.service';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [ExperienceArticleComponent],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent implements OnInit {
  title = "Work Experience";
  experiences: Experience[] = [];

  constructor(private firebaseAppService: FirebaseAppService) {
    
  }

  ngOnInit(): void {
    this.firebaseAppService.getWorkExperiences().subscribe(experiences => {
      this.experiences = experiences;
    });
  }
}
