export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-home text-purple'
  },
  {
    path: '/admin/client',
    title: 'Client',
    type: 'link',
    icontype: 'fas fa-handshake text-red'
  },
  {
    path: '/admin/sales-business-development',
    title: 'Sales & Business Development',
    type: 'sub',
    icontype: 'fas fa-file-invoice-dollar text-yellow',
    collapse: 'sales-business-development',
    isCollapsed: true,
    children: [
      { path: 'request-for-information', title: 'Request for Information (RFI)', type: 'link' },
      { path: 'application-review', title: 'Application Review (AR)', type: 'link' },
      { path: 'quotation-invoice', title: 'Quotation & Invoice', type: 'link' },
    ]
  },
  {
    path: '/admin/payment',
    title: 'Payment',
    type: 'link',
    icontype: 'fas fa-dollar-sign text-orange'
  },
  {
    path: '/admin/scheduler',
    title: 'Scheduler',
    type: 'link',
    icontype: 'fas fa-calendar-alt text-green'
  },
  {
    path: '/admin/auditor',
    title: 'Auditor',
    type: 'sub',
    icontype: 'fas fa-clipboard text-pink',
    collapse: 'auditor',
    isCollapsed: true,
    children: [
      { path: 'audit-report', title: 'Audit Report', type: 'link' },
      { path: 'audit-report-template', title: 'Audit Report Template', type: 'link' }
    ]
  },
  {
    path: '/admin/report',
    title: 'Report',
    type: 'link',
    icontype: 'fas fa-chart-bar text-cyan'
  },
  // {
  //   path: '/admin/management',
  //   title: 'Management',
  //   type: 'sub',
  //   icontype: 'fas fa-file-invoice text-pink',
  //   collapse: 'management',
  //   isCollapsed: true,
  //   children: [
  //     { path: 'audit-trails', title: 'Audit Trails', type: 'link' },
  //     { path: 'user', title: 'User', type: 'link' }
  //   ]
  // },
  
  /*
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  }
  */
];

export const ROUTESUSER: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-warning'
  },
  {
    path: '/applications',
    title: 'Applications',
    type: 'link',
    icontype: 'fas fa-file-invoice text-pink'
  },
  {
    path: '/houses',
    title: 'Houses',
    type: 'link',
    icontype: 'fas fa-home text-purple'
  },
  {
    path: '/management',
    title: 'Management',
    type: 'link',
    icontype: 'fas fa-tasks text-red'
  },
  {
    path: '/report',
    title: 'Report',
    type: 'link',
    icontype: 'fas fa-chart-bar text-green'
  },
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  }/*,
  {
    path: '/maintenance',
    title: 'Maintenance',
    type: 'link',
    icontype: 'fas fa-cogs text-orange'
  }*/
  /*{
    path: '/settings',
    title: 'Settings',
    type: 'link',
    icontype: 'fas fa-sliders-h text-blue'
  }*/
];