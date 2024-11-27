import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { ExperienceDetail } from '../../data/experience-detail';
import { ExperienceDetailPipe } from "../experiences/experience-detail.pipe";
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-experience-detail-dialog',
  templateUrl: './experience-detail-dialog.component.html',
  imports: [MatDialogModule, MatDialogContent, MatButtonModule, ExperienceDetailPipe]
})
export class DialogContentExperienceDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ExperienceDetail) {

  }
}
