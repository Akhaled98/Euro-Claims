import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInsuranceCompanyComponent } from './new-insurance-company.component';

describe('NewInsuranceCompanyComponent', () => {
  let component: NewInsuranceCompanyComponent;
  let fixture: ComponentFixture<NewInsuranceCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInsuranceCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInsuranceCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
