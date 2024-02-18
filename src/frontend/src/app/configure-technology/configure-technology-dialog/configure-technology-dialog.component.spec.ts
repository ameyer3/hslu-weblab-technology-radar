import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTechnologyDialogComponent } from './configure-technology-dialog.component';

describe('ConfigureTechnologyDialogComponent', () => {
  let component: ConfigureTechnologyDialogComponent;
  let fixture: ComponentFixture<ConfigureTechnologyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureTechnologyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigureTechnologyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
