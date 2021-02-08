import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from "sweetalert2";

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

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
    salary: "RM320,800",
    status: "success",
    project: "Malaysian Brand",
    period: "2 Years",
    time: "9.00 AM",
    company: "A Sdn. Bhd."
  },
  {
    name: "Garrett Winters",
    typeDoc: "Accountant",
    office: "Tokyo",
    clientId: "63",
    date: "2011/07/25",
    salary: "RM170,750",
    status: "cancel",
    project: "MSPO",
    period: "5 Years",
    time: "10.00 AM",
    company: "B Sdn. Bhd."
  },
  {
    name: "Ashton Cox",
    typeDoc: "Junior Technical Author",
    office: "San Francisco",
    clientId: "66",
    date: "2009/01/12",
    salary: "RM86,000",
    status: "success",
    project: "MSPOSC",
    period: "2 Years",
    time: "9.45 AM",
    company: "C Sdn. Bhd."
  },
  {
    name: "Cedric Kelly",
    typeDoc: "Senior Javascript Developer",
    office: "Edinburgh",
    clientId: "22",
    date: "2012/03/29",
    salary: "RM433,060",
    status: "cancel",
    project: "RSPO",
    period: "5 Years",
    time: "2.00 PM",
    company: "D Sdn. Bhd."
  },
  {
    name: "Airi Satou",
    typeDoc: "Accountant",
    office: "Tokyo",
    clientId: "33",
    date: "2008/11/28",
    salary: "RM162,700",
    status: "success",
    project: "MSPO",
    period: "2 Years",
    time: "11.00 AM",
    company: "E Sdn. Bhd."
  },
  {
    name: "Brielle Williamson",
    typeDoc: "Integration Specialist",
    office: "New York",
    clientId: "61",
    date: "2012/12/02",
    salary: "RM372,000",
    status: "cancel",
    project: "MSPOSC",
    period: "5 Years",
    time: "9.00 AM",
    company: "A Sdn. Bhd."
  },
  {
    name: "Herrod Chandler",
    typeDoc: "Sales Assistant",
    office: "San Francisco",
    clientId: "59",
    date: "2012/08/06",
    salary: "RM137,500",
    status: "cancel",
    project: "RSPO",
    period: "2 Years",
    time: "9.00 AM",
    company: "B Sdn. Bhd."
  },
  {
    name: "Rhona Davidson",
    typeDoc: "Integration Specialist",
    office: "Tokyo",
    clientId: "55",
    date: "2010/10/14",
    salary: "RM327,900",
    status: "success",
    project: "Malaysian Brand",
    period: "5 Years",
    time: "9.00 AM",
    company: "C Sdn. Bhd."
  },
  {
    name: "Colleen Hurst",
    typeDoc: "Javascript Developer",
    office: "San Francisco",
    clientId: "39",
    date: "2009/09/15",
    salary: "RM205,500",
    status: "cancel",
    project: "MSPO",
    period: "2 Years",
    time: "9.00 AM",
    company: "D Sdn. Bhd."
  },
  {
    name: "Sonya Frost",
    typeDoc: "Software Engineer",
    office: "Edinburgh",
    clientId: "23",
    date: "2008/12/13",
    salary: "RM103,600",
    status: "success",
    project: "MSPOSC",
    period: "5 Years",
    time: "9.00 AM",
    company: "E Sdn. Bhd."
  },
  {
    name: "Jena Gaines",
    typeDoc: "Office ManclientIdr",
    office: "London",
    clientId: "30",
    date: "2008/12/19",
    salary: "RM90,560",
    status: "success",
    project: "RSPO",
    period: "2 Years",
    time: "9.00 AM",
    company: "A Sdn. Bhd."
  },
  {
    name: "Quinn Flynn",
    typeDoc: "Support Lead",
    office: "Edinburgh",
    clientId: "22",
    date: "2013/03/03",
    salary: "RM342,000",
    status: "cancel",
    project: "Malaysian Brand",
    period: "5 Years",
    time: "9.00 AM",
    company: "B Sdn. Bhd."
  },
  {
    name: "Charde Marshall",
    typeDoc: "Regional Director",
    office: "San Francisco",
    clientId: "36",
    date: "2008/10/16",
    salary: "RM470,600",
    status: "success",
    project: "MSPO",
    period: "2 Years",
    time: "9.00 AM",
    company: "C Sdn. Bhd."
  },
  {
    name: "Haley Kennedy",
    typeDoc: "Senior Marketing Designer",
    office: "London",
    clientId: "43",
    date: "2012/12/18",
    salary: "RM313,500",
    status: "success",
    project: "MSPOSC",
    period: "5 Years",
    time: "9.00 AM",
    company: "D Sdn. Bhd."
  },
  {
    name: "Tatyana Fitzpatrick",
    typeDoc: "Regional Director",
    office: "London",
    clientId: "19",
    date: "2010/03/17",
    salary: "RM385,750",
    status: "cancel",
    project: "RSPO",
    period: "2 Years",
    time: "9.00 AM",
    company: "E Sdn. Bhd."
  },
  ];
  SelectionType = SelectionType;

  //modal
  modalRef: BsModalRef;

  constructor(
    private zone: NgZone,
    private modalService: BsModalService
  ) { 
    this.temp = this.rows.map((prop,key)=>{
      return {
        ...prop,
        id: key
      };

    });
  }

  ngOnInit() {
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  successSwal() {
    swal.fire({
      title: "Saved",
      text: "Successfully saved",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    });
    this.modalRef.hide()
  }

}
