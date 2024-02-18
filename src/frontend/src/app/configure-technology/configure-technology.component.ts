import { Component } from '@angular/core';
import { Technology, TechnologyService } from '../services/technology.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatIconModule } from "@angular/material/icon"
@Component({
  selector: 'app-configure-technology',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCheckboxModule, MatTableModule, MatIconModule],
  providers: [TechnologyService],
  templateUrl: './configure-technology.component.html',
  styleUrl: './configure-technology.component.scss'
})
export class ConfigureTechnologyComponent {

  rings = ["Assess", "Trial", "Adopt", "Hold"];
  categories = ["Techniques", "Tools", "Platforms", "Languages & Frameworks"];
  public allTechnologies$: Observable<Technology[]>
  displayedColumns: string[] = ['name', 'category', 'ring', 'description', 'published', 'edit'];

  constructor(private techService: TechnologyService) {
    this.allTechnologies$ = this.techService.getAllTechnologies();

  }

  model: Technology = { name: "", category: "", ring: "", description: "", published: false }

  onSubmit(tech: Technology): void {
    console.log(tech);
    this.techService.createNewTechnology(tech).subscribe();
  }
}
