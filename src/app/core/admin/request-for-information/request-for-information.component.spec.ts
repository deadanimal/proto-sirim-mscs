import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForInformationComponent } from './request-for-information.component';

describe('RequestForInformationComponent', () => {
  let component: RequestForInformationComponent;
  let fixture: ComponentFixture<RequestForInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestForInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
