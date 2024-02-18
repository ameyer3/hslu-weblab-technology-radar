import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Technology, TechnologyService } from '../services/technology.service';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss',
  providers: [TechnologyService]
})
export class TechnologiesComponent {
  public publishedTechnologies$: Observable<Technology[]>

  constructor(private techService: TechnologyService) {
    this.publishedTechnologies$ = techService.getAllPublishedTechnologies();
  }



}
