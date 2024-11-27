import { Component, OnDestroy, OnInit } from '@angular/core';
import { Experience } from '../../data/experience';
import { ExperienceArticleComponent } from '../experience-article/experience-article.component';
import { FirebaseAppService } from '../services/firebase-app.service';
import { Observable, Subscription, from, of } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  standalone: true,
  selector: 'app-experiences',
  imports: [ExperienceArticleComponent, MatProgressBarModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent implements OnInit, OnDestroy {
  title = "Work Experience";
  experiences: Experience[] = [];
  experiencesSubscription: Subscription;
  nowLoading: boolean = true;
  loading$: Observable<boolean>;

  constructor(private firebaseAppService: FirebaseAppService) {
    this.experiencesSubscription = from(this.firebaseAppService.getExperiences()).subscribe(experiences => {
      this.experiences = experiences;
    })

    this.loading$ = of(this.experiencesSubscription.closed);
  }

  ngOnInit(): void {
    // disable loading progress indicator after experience data has been loaded
    this.loading$.subscribe(() => {
      this.nowLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.experiencesSubscription.unsubscribe();
  }
}
