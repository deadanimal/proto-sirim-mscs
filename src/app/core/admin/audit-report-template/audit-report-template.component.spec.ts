import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditReportTemplateComponent } from './audit-report-template.component';

describe('AuditReportTemplateComponent', () => {
  let component: AuditReportTemplateComponent;
  let fixture: ComponentFixture<AuditReportTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditReportTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
