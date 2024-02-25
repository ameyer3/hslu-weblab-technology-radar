import { Component } from '@angular/core';
import { Technology, TechnologyService } from '../services/technology.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BehaviorSubject, Observable, lastValueFrom, switchMap, tap } from 'rxjs';
import { MatIconModule } from "@angular/material/icon"
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ConfigureTechnologyDialogComponent } from './configure-technology-dialog/configure-technology-dialog.component';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-configure-technology',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule],
  providers: [TechnologyService],
  templateUrl: './configure-technology.component.html',
  styleUrl: './configure-technology.component.scss'
})
export class ConfigureTechnologyComponent {


  public allTechnologies$: Observable<Technology[]>
  displayedColumns: string[] = ['name', 'category', 'ring', 'ringdescription', 'description', 'published', 'edit'];
  private loadTechnologies$ = new BehaviorSubject<void>(undefined);

  constructor(private techService: TechnologyService,
    private dialog: MatDialog) {
    this.allTechnologies$ = this.loadTechnologies$.pipe(switchMap(() => this.techService.getAllTechnologies()));
    this.techService.getAllTechnologies().subscribe()
    this.allTechnologies$.subscribe()
  }


  editTechnology(technology?: Technology): void {
    if (technology === undefined) {
      technology = { id: 0, name: "", description: "", ringdescription: "", category: "", ring: "", published: false };
    }
    const dialogRef = this.dialog.open(ConfigureTechnologyDialogComponent, {
      data: { technology },
      width: '70%',
    })
    lastValueFrom(dialogRef.afterClosed().pipe(tap(c => this.loadTechnologies$.next())))
  }

  publish(technology: Technology): void {
    if (technology.ring !== "" && technology.ringdescription !== "") {
      technology.published = !technology.published;
      this.techService.updatePublishTechnology(technology).subscribe();
    }
    else {
      alert("Please fill in the ring and ring description first");
    }
  }

}
