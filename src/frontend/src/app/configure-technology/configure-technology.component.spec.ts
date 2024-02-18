import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ConfigureTechnologyComponent } from './configure-technology.component';
import { RouterTestingModule } from "@angular/router/testing";


describe('ConfigureTechnologyComponent', () => {
  let component: ConfigureTechnologyComponent;
  let fixture: ComponentFixture<ConfigureTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureTechnologyComponent, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfigureTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ConfigureTechnologyComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Add a Technology');
  });
});
