import { Routes } from '@angular/router';
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

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'client',
                component: ClientComponent
            },
            {
                path: 'sales-business-development',
                children: [
                    {
                        path: 'request-for-information',
                        component: RequestForInformationComponent
                    },
                    {
                        path: 'application-review',
                        component: ApplicationReviewComponent
                    },
                    {
                        path: 'quotation-invoice',
                        component: QuotationInvoiceComponent
                    },
                ]
            },
            {
                path: 'payment',
                component: PaymentComponent
            },
            {
                path: 'scheduler',
                component: SchedulerComponent
            },
            {
                path: 'auditor',
                children: [
                    {
                        path: 'audit-report',
                        component: AuditReportComponent
                    },
                    {
                        path: 'audit-report-template',
                        component: AuditReportTemplateComponent
                    }
                ]
            },
            {
                path: 'report',
                component: ReportComponent
            },
            {
                path: 'management',
                children: [
                    {
                        path: 'audit-trails',
                        component: ManagementAuditComponent
                    },
                    {
                        path: 'user',
                        component: ManagementUserComponent
                    }
                ]
            },
            
        ]
    }
]