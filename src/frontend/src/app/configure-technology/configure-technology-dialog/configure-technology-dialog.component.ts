import { Component, Inject } from '@angular/core';
import { Technology, TechnologyService } from '../../services/technology.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatIconModule } from "@angular/material/icon"
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-configure-technology-dialog',
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
  templateUrl: './configure-technology-dialog.component.html',
  styleUrl: './configure-technology-dialog.component.scss'
})
export class ConfigureTechnologyDialogComponent {

  rings = ["Assess", "Trial", "Adopt", "Hold"];
  categories = ["Techniques", "Tools", "Platforms", "Languages & Frameworks"];

  model: Technology = this.data.technology;

  constructor(private techService: TechnologyService,
    private dialog: MatDialogRef<ConfigureTechnologyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { technology: Technology }) {
  }


  onSubmit(): void {
    if (this.model.id == 0) {
      this.techService.createNewTechnology(this.model).subscribe();

    }
    else {
      this.techService.updateTechnology(this.model).subscribe();
    }
    this.dialog.close()
  }



}
