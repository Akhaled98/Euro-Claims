import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPreviewComponent } from './assign-preview.component';

describe('AssignPreviewComponent', () => {
  let component: AssignPreviewComponent;
  let fixture: ComponentFixture<AssignPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
