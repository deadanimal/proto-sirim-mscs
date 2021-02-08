import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBusinessDevelopmentComponent } from './sales-business-development.component';

describe('SalesBusinessDevelopmentComponent', () => {
  let component: SalesBusinessDevelopmentComponent;
  let fixture: ComponentFixture<SalesBusinessDevelopmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesBusinessDevelopmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesBusinessDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
