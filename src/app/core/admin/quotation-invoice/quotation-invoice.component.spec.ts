import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationInvoiceComponent } from './quotation-invoice.component';

describe('QuotationInvoiceComponent', () => {
  let component: QuotationInvoiceComponent;
  let fixture: ComponentFixture<QuotationInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
