import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentClsComponent } from './admin-student-cls.component';

describe('AdminStudentClsComponent', () => {
  let component: AdminStudentClsComponent;
  let fixture: ComponentFixture<AdminStudentClsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentClsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStudentClsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
