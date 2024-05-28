import { Component, OnDestroy } from '@angular/core';
import { Experience } from '../../data/experience';
import { ExperienceArticleComponent } from '../experience-article/experience-article.component';
import { FirebaseAppService } from '../services/firebase-app.service';
import { Subscription, from } from 'rxjs';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [ExperienceArticleComponent],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent implements OnDestroy {
  title = "Work Experience";
  experiences: Experience[] = [];
  experiencesSubscription: Subscription;

  constructor(private firebaseAppService: FirebaseAppService) {
    this.experiencesSubscription = from(firebaseAppService.getExperiences()).subscribe(experiences => {
      this.experiences = experiences;
    })
  }

  ngOnDestroy(): void {
    this.experiencesSubscription.unsubscribe();
  }
}
