import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ConfigureTechnologyDialogComponent } from './configure-technology-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TechnologyService } from '../../services/technology.service';

describe('ConfigureTechnologyDialogComponent', () => {
  let component: ConfigureTechnologyDialogComponent;
  let fixture: ComponentFixture<ConfigureTechnologyDialogComponent>;
  let technologyServiceMock: jasmine.SpyObj<TechnologyService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureTechnologyDialogComponent, HttpClientTestingModule, MatDialogModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            technology: { name: "testname", description: "description", category: "Trial" }
          }
        }]
    })
      .compileComponents();
    technologyServiceMock = jasmine.createSpyObj("technologyService", ["createNewTechnology", "updateNewTechnology"]);

    TestBed.overrideComponent(ConfigureTechnologyDialogComponent, {
      set: {
        providers: [{ provide: TechnologyService, useValue: technologyServiceMock }]
      }
    })



    fixture = TestBed.createComponent(ConfigureTechnologyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Save');
  });

  it('should fill textboxes with values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let inputs = compiled.querySelectorAll('input');
    expect(inputs.length).toBe(3);
    expect(inputs[0].value).toContain('testname');
    expect(inputs[1].value).toBe('');
    expect(inputs[2].value).toContain('description');

    let dropdowns = fixture.nativeElement.querySelectorAll('mat-select');
    expect(dropdowns.length).toBe(2);

  });


});
