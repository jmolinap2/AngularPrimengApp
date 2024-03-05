import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprofessionalComponent } from './newprofessional.component';

describe('NewprofessionalComponent', () => {
  let component: NewprofessionalComponent;
  let fixture: ComponentFixture<NewprofessionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewprofessionalComponent]
    });
    fixture = TestBed.createComponent(NewprofessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
