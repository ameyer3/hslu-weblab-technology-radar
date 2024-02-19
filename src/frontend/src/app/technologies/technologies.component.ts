import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Technology, TechnologyService } from '../services/technology.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss',
  providers: [TechnologyService]
})
export class TechnologiesComponent {
  public publishedTechnologies$: Observable<Technology[]>
  displayedColumns: string[] = ['name', 'category', 'ring', 'description'];

  //order by
  // filter
  //sort
  constructor(private techService: TechnologyService) {
    this.publishedTechnologies$ = techService.getAllPublishedTechnologies().pipe(tap(techs => {
      techs.sort(
        (a: Technology, b: Technology) => {
          let order = a.category.localeCompare(b.category);
          if (order == 0) { order = a.ring.localeCompare(b.ring); };
          return order;
        }
      )
    }));
  }



}
