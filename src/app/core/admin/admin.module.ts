import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  AccordionModule,
  BsDropdownModule,
  ModalModule,
  ProgressbarModule, 
  TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditComponent } from './management-audit/management-audit.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ReportComponent } from './report/report.component';
import { ClientComponent } from './client/client.component';
import { SalesBusinessDevelopmentComponent } from './sales-business-development/sales-business-development.component';
import { PaymentComponent } from './payment/payment.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { AuditReportComponent } from './audit-report/audit-report.component';
import { AuditReportTemplateComponent } from './audit-report-template/audit-report-template.component';
import { RequestForInformationComponent } from './request-for-information/request-for-information.component';
import { ApplicationReviewComponent } from './application-review/application-review.component';
import { QuotationInvoiceComponent } from './quotation-invoice/quotation-invoice.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementAuditComponent,
    ManagementUserComponent,
    ReportComponent,
    ClientComponent,
    SalesBusinessDevelopmentComponent,
    PaymentComponent,
    SchedulerComponent,
    AuditReportComponent,
    AuditReportTemplateComponent,
    RequestForInformationComponent,
    ApplicationReviewComponent,
    QuotationInvoiceComponent
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxDatatableModule,
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
