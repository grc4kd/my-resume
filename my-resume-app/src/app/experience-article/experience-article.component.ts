import { Component, Input } from '@angular/core';
import { Experience } from '../../data/experience';
import { DatePipe } from '@angular/common';
import { DialogContentExperienceDetailComponent } from '../experience-detail-dialog/experience-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-experience-article',
  standalone: true,
  templateUrl: './experience-article.component.html',
  styleUrl: './experience-article.component.css',
  imports: [DatePipe, MatButtonModule]
})
export class ExperienceArticleComponent {
  @Input({ required: true }) experience!: Experience;

  constructor(public dialog: MatDialog) {

  }

  openDialog() {
    this.dialog.open(DialogContentExperienceDetailComponent, {
      data: this.experience.detail,
    });
  }
}
