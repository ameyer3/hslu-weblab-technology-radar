import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnologiesComponent } from './technologies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TechnologyService } from '../services/technology.service';
import { of } from 'rxjs';

describe('TechnologiesComponent', () => {
  let component: TechnologiesComponent;
  let fixture: ComponentFixture<TechnologiesComponent>;
  let technologyServiceMock: jasmine.SpyObj<TechnologyService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologiesComponent, HttpClientTestingModule]
    })
      .compileComponents();
    technologyServiceMock = jasmine.createSpyObj("technologyService", ["getAllPublishedTechnologies"]);

    TestBed.overrideComponent(TechnologiesComponent, {
      set: {
        providers: [{ provide: TechnologyService, useValue: technologyServiceMock }]
      }
    })

    technologyServiceMock.getAllPublishedTechnologies.and.returnValue(of([
      { id: 1, name: "testname1", description: "description1", category: "Techniques", ring: "Adopt", ringdescription: "ringdescription", published: true },
      { id: 2, name: "testname4", description: "description4", category: "Tools", ring: "Hold", ringdescription: "ringdescription", published: true },
      { id: 3, name: "testname5", description: "description5", category: "Tools", ring: "Trial", ringdescription: "ringdescription", published: true },
      { id: 4, name: "testname3", description: "description3", category: "Tools", ring: "Adopt", ringdescription: "ringdescription", published: true },
      { id: 5, name: "testname2", description: "description2", category: "Techniques", ring: "Hold", ringdescription: "ringdescription", published: true }]));

    fixture = TestBed.createComponent(TechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Technologies');
  });

  it('should render table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(6);

    let headerRow = tableRows[0];
    expect(headerRow.cells[0].textContent.trim()).toBe('Name');
    expect(headerRow.cells[1].textContent.trim()).toBe('Category');
    expect(headerRow.cells[2].textContent.trim()).toBe('Description');
    expect(headerRow.cells[3].textContent.trim()).toBe('Ring');
    expect(headerRow.cells[4].textContent.trim()).toBe('Ring Description');


    let row1 = tableRows[1];
    expect(row1.cells[0].textContent.trim()).toBe('testname1');
    expect(row1.cells[1].textContent.trim()).toBe('Techniques');
    expect(row1.cells[2].textContent.trim()).toBe('description1');
    expect(row1.cells[3].textContent.trim()).toBe('Adopt');
    expect(row1.cells[4].textContent.trim()).toBe('ringdescription');


    let row2 = tableRows[2];
    expect(row2.cells[0].textContent.trim()).toBe('testname2');
    expect(row2.cells[1].textContent.trim()).toBe('Techniques');
    expect(row2.cells[2].textContent.trim()).toBe('description2');
    expect(row2.cells[3].textContent.trim()).toBe('Hold')
    expect(row2.cells[4].textContent.trim()).toBe('ringdescription');

    let row3 = tableRows[3];
    expect(row3.cells[0].textContent.trim()).toBe('testname3');
    expect(row3.cells[1].textContent.trim()).toBe('Tools');
    expect(row3.cells[2].textContent.trim()).toBe('description3');
    expect(row3.cells[3].textContent.trim()).toBe('Adopt');

    let row4 = tableRows[4];
    expect(row4.cells[0].textContent.trim()).toBe('testname4');
    expect(row4.cells[1].textContent.trim()).toBe('Tools');
    expect(row4.cells[2].textContent.trim()).toBe('description4');
    expect(row4.cells[3].textContent.trim()).toBe('Hold');

    let row5 = tableRows[5];
    expect(row5.cells[0].textContent.trim()).toBe('testname5');
    expect(row5.cells[1].textContent.trim()).toBe('Tools');
    expect(row5.cells[2].textContent.trim()).toBe('description5');
    expect(row5.cells[3].textContent.trim()).toBe('Trial');

  });

});
