import { Component, OnInit } from '@angular/core';
import Quill from 'quill';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-audit-report-template',
  templateUrl: './audit-report-template.component.html',
  styleUrls: ['./audit-report-template.component.scss']
})
export class AuditReportTemplateComponent implements OnInit {

  //table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
  {
    name: "Tiger Nixon",
    typeDoc: "System Architect",
    office: "Edinburgh",
    clientId: "61",
    date: "2011/04/25",
    salary: "$320,800",
    status: "success",
    ncr: "success",
    issue: "No",
    improve: "Yes"
  },
  {
    name: "Garrett Winters",
    typeDoc: "Accountant",
    office: "Tokyo",
    clientId: "63",
    date: "2011/07/25",
    salary: "$170,750",
    status: "cancel",
    ncr: "cancel",
    issue: "Yes",
    improve: "Yes"
  },
  {
    name: "Ashton Cox",
    typeDoc: "Junior Technical Author",
    office: "San Francisco",
    clientId: "66",
    date: "2009/01/12",
    salary: "$86,000",
    status: "success",
    ncr: "going",
    issue: "No",
    improve: "Yes"
  },
  {
    name: "Cedric Kelly",
    typeDoc: "Senior Javascript Developer",
    office: "Edinburgh",
    clientId: "22",
    date: "2012/03/29",
    salary: "$433,060",
    status: "success",
    ncr: "going",
    issue: "Yes",
    improve: "Yes"
  },
  {
    name: "Airi Satou",
    typeDoc: "Accountant",
    office: "Tokyo",
    clientId: "33",
    date: "2008/11/28",
    salary: "$162,700",
    status: "success",
    ncr: "success",
    issue: "No",
    improve: "Yes"
  },
  {
    name: "Brielle Williamson",
    typeDoc: "Integration Specialist",
    office: "New York",
    clientId: "61",
    date: "2012/12/02",
    salary: "$372,000",
    status: "cancel",
    ncr: "cancel",
    issue: "Yes",
    improve: "Yes"
  },
  {
    name: "Herrod Chandler",
    typeDoc: "Sales Assistant",
    office: "San Francisco",
    clientId: "59",
    date: "2012/08/06",
    salary: "$137,500",
    status: "cancel",
    ncr: "cancel",
    issue: "Yes",
    improve: "Yes"
  },
  {
    name: "Rhona Davidson",
    typeDoc: "Integration Specialist",
    office: "Tokyo",
    clientId: "55",
    date: "2010/10/14",
    salary: "$327,900",
    status: "success",
    ncr: "going",
    issue: "No",
    improve: "Yes"
  },
  {
    name: "Colleen Hurst",
    typeDoc: "Javascript Developer",
    office: "San Francisco",
    clientId: "39",
    date: "2009/09/15",
    salary: "$205,500",
    status: "cancel",
    ncr: "cancel",
    issue: "Yes",
    improve: "Yes"
  },
  {
    name: "Sonya Frost",
    typeDoc: "Software Engineer",
    office: "Edinburgh",
    clientId: "23",
    date: "2008/12/13",
    salary: "$103,600",
    status: "success",
    ncr: "success",
    issue: "No",
    improve: "Yes"
  },
  {
    name: "Jena Gaines",
    typeDoc: "Office ManclientIdr",
    office: "London",
    clientId: "30",
    date: "2008/12/19",
    salary: "$90,560",
    status: "success",
    ncr: "going",
    issue: "No",
    improve: "Yes"
  },
  {
    name: "Quinn Flynn",
    typeDoc: "Support Lead",
    office: "Edinburgh",
    clientId: "22",
    date: "2013/03/03",
    salary: "$342,000",
    status: "cancel",
    ncr: "cancel",
    issue: "No",
    improve: "Yes"
  },
  {
    name: "Charde Marshall",
    typeDoc: "Regional Director",
    office: "San Francisco",
    clientId: "36",
    date: "2008/10/16",
    salary: "$470,600",
    status: "success",
    ncr: "success",
    issue: "No",
    improve: "Yes"
  },
  {
    name: "Haley Kennedy",
    typeDoc: "Senior Marketing Designer",
    office: "London",
    clientId: "43",
    date: "2012/12/18",
    salary: "$313,500",
    status: "success",
    ncr: "going",
    issue: "No",
    improve: "Yes"
  },
  {
    name: "Tatyana Fitzpatrick",
    typeDoc: "Regional Director",
    office: "London",
    clientId: "19",
    date: "2010/03/17",
    salary: "$385,750",
    status: "cancel",
    ncr: "cancel",
    issue: "No",
    improve: "Yes"
  },
  ];
  SelectionType = SelectionType;

  constructor() {
    this.temp = this.rows.map((prop,key)=>{
      return {
        ...prop,
        id: key
      };

    });
   }

  ngOnInit() {
    var quill = new Quill('#quill',{
			modules: {
				toolbar: [
					['bold', 'italic', 'underline', 'strike'],        // toggled buttons

          ['link', 'blockquote', 'code', 'image'],
					[{
						'list': 'ordered'
					}, {
						'list': 'bullet'
					}]
				]
			},
			placeholder: 'Quill WYSIWYG',
			theme: 'snow'
		});
  }

  entriesChange($event){
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {

      for(var key in d){
        if(d[key].toLowerCase().indexOf(val) !== -1){
          return true;
        }
      }
      return false;
    });
  }
}

