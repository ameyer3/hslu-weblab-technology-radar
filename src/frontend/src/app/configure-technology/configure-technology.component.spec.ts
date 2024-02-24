import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ConfigureTechnologyComponent } from './configure-technology.component';
import { RouterTestingModule } from "@angular/router/testing";
import { TechnologyService } from '../services/technology.service';
import { of } from 'rxjs';


describe('ConfigureTechnologyComponent', () => {
  let component: ConfigureTechnologyComponent;
  let fixture: ComponentFixture<ConfigureTechnologyComponent>;
  let technologyServiceMock = jasmine.createSpyObj("technologyService", ["getAllTechnologies"])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureTechnologyComponent, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    TestBed.overrideComponent(ConfigureTechnologyComponent, {
      set: {
        providers: [{ provide: TechnologyService, useValue: technologyServiceMock }]
      }
    })


    technologyServiceMock.getAllTechnologies.and.returnValue(of([
      { name: "testname", description: "description", category: "category", published: false },
      { name: "testname2", description: "description", category: "category", ring: "ring", ringdescription: "ringdescription", published: true }]));

    fixture = TestBed.createComponent(ConfigureTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Add a Technology');
  });

  it('should render button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('new');
  });

  it('should render table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(3);

    let headerRow = tableRows[0];
    expect(headerRow.cells[0].textContent.trim()).toBe('Name');
    expect(headerRow.cells[1].textContent.trim()).toBe('Category');
    expect(headerRow.cells[2].textContent.trim()).toBe('Ring');
    expect(headerRow.cells[3].textContent.trim()).toBe('Ring Description');
    expect(headerRow.cells[4].textContent.trim()).toBe('Description');
    expect(headerRow.cells[5].textContent.trim()).toBe('Publish?');
    expect(headerRow.cells[6].textContent.trim()).toBe('Edit');

    let row1 = tableRows[1];
    expect(row1.cells[0].textContent.trim()).toBe('testname');
    expect(row1.cells[1].textContent.trim()).toBe('category');
    expect(row1.cells[2].textContent.trim()).toBe('');
    expect(row1.cells[3].textContent.trim()).toBe('');
    expect(row1.cells[4].textContent.trim()).toBe('description');
    expect(row1.cells[5].textContent.trim()).toBe('cloud_upload');
    expect(row1.cells[6].textContent.trim()).toBe('edit');

    let row2 = tableRows[2];
    expect(row2.cells[0].textContent.trim()).toBe('testname2');
    expect(row2.cells[1].textContent.trim()).toBe('category');
    expect(row2.cells[3].textContent.trim()).toBe('ringdescription');
    expect(row2.cells[2].textContent.trim()).toBe('ring')
    expect(row2.cells[4].textContent.trim()).toBe('description');
    expect(row2.cells[5].textContent.trim()).toBe('cloud_download');
    expect(row2.cells[6].textContent.trim()).toBe('edit');


  });
});
