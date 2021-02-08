import { Component, OnInit, NgZone, OnDestroy, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from "sweetalert2";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit, OnDestroy {

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
    project: "Malaysian Brand",
    period: "2 Years"
  },
  {
    name: "Garrett Winters",
    typeDoc: "Accountant",
    office: "Tokyo",
    clientId: "63",
    date: "2011/07/25",
    salary: "$170,750",
    status: "cancel",
    project: "MSPO",
    period: "5 Years"
  },
  {
    name: "Ashton Cox",
    typeDoc: "Junior Technical Author",
    office: "San Francisco",
    clientId: "66",
    date: "2009/01/12",
    salary: "$86,000",
    status: "success",
    project: "MSPOSC",
    period: "2 Years"
  },
  {
    name: "Cedric Kelly",
    typeDoc: "Senior Javascript Developer",
    office: "Edinburgh",
    clientId: "22",
    date: "2012/03/29",
    salary: "$433,060",
    status: "cancel",
    project: "RSPO",
    period: "5 Years"
  },
  {
    name: "Airi Satou",
    typeDoc: "Accountant",
    office: "Tokyo",
    clientId: "33",
    date: "2008/11/28",
    salary: "$162,700",
    status: "success",
    project: "MSPO",
    period: "2 Years"
  },
  {
    name: "Brielle Williamson",
    typeDoc: "Integration Specialist",
    office: "New York",
    clientId: "61",
    date: "2012/12/02",
    salary: "$372,000",
    status: "cancel",
    project: "MSPOSC",
    period: "5 Years"
  },
  {
    name: "Herrod Chandler",
    typeDoc: "Sales Assistant",
    office: "San Francisco",
    clientId: "59",
    date: "2012/08/06",
    salary: "$137,500",
    status: "cancel",
    project: "RSPO",
    period: "2 Years"
  },
  {
    name: "Rhona Davidson",
    typeDoc: "Integration Specialist",
    office: "Tokyo",
    clientId: "55",
    date: "2010/10/14",
    salary: "$327,900",
    status: "success",
    project: "Malaysian Brand",
    period: "5 Years"
  },
  {
    name: "Colleen Hurst",
    typeDoc: "Javascript Developer",
    office: "San Francisco",
    clientId: "39",
    date: "2009/09/15",
    salary: "$205,500",
    status: "cancel",
    project: "MSPO",
    period: "2 Years"
  },
  {
    name: "Sonya Frost",
    typeDoc: "Software Engineer",
    office: "Edinburgh",
    clientId: "23",
    date: "2008/12/13",
    salary: "$103,600",
    status: "success",
    project: "MSPOSC",
    period: "5 Years"
  },
  {
    name: "Jena Gaines",
    typeDoc: "Office ManclientIdr",
    office: "London",
    clientId: "30",
    date: "2008/12/19",
    salary: "$90,560",
    status: "success",
    project: "RSPO",
    period: "2 Years"
  },
  {
    name: "Quinn Flynn",
    typeDoc: "Support Lead",
    office: "Edinburgh",
    clientId: "22",
    date: "2013/03/03",
    salary: "$342,000",
    status: "cancel",
    project: "Malaysian Brand",
    period: "5 Years"
  },
  {
    name: "Charde Marshall",
    typeDoc: "Regional Director",
    office: "San Francisco",
    clientId: "36",
    date: "2008/10/16",
    salary: "$470,600",
    status: "success",
    project: "MSPO",
    period: "2 Years"
  },
  {
    name: "Haley Kennedy",
    typeDoc: "Senior Marketing Designer",
    office: "London",
    clientId: "43",
    date: "2012/12/18",
    salary: "$313,500",
    status: "success",
    project: "MSPOSC",
    period: "5 Years"
  },
  {
    name: "Tatyana Fitzpatrick",
    typeDoc: "Regional Director",
    office: "London",
    clientId: "19",
    date: "2010/03/17",
    salary: "$385,750",
    status: "cancel",
    project: "RSPO",
    period: "2 Years"
  },
  ];
  SelectionType = SelectionType;

  //modal
  modalRef: BsModalRef;

  //chart
  private chartScheduler1: any
  private chartScheduler2: any

  //calender
  addModal: BsModalRef;
  editModal: BsModalRef;
  @ViewChild("modalAdd") modalAdd: ElementRef;
  @ViewChild("modalEdit") modalEdit: ElementRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered modal-secondary"
  };
  radios = "bg-danger";
  eventTitle = undefined;
  eventDescription;
  eventId;
  event;
  startDate;
  endDate;
  calendar;
  today = new Date();
  y = this.today.getFullYear();
  m = this.today.getMonth();
  d = this.today.getDate();
  events = [
    {
      id: 0,
      title: "Lunch meeting",
      start: "2018-11-21",
      end: "2018-11-22",
      className: "bg-orange"
    },
    {
      id: 1,
      title: "Call with Dave",
      start: new Date(this.y, this.m, 1),
      allDay: true,
      className: "bg-red",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 2,
      title: "Lunch meeting",
      start: new Date(this.y, this.m, this.d - 1, 10, 30),
      allDay: true,
      className: "bg-orange",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 3,
      title: "All day conference",
      start: new Date(this.y, this.m, this.d + 7, 12, 0),
      allDay: true,
      className: "bg-green",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 4,
      title: "Meeting with Mary",
      start: new Date(this.y, this.m, this.d - 2),
      allDay: true,
      className: "bg-blue",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 5,
      title: "Winter Hackaton",
      start: new Date(this.y, this.m, this.d + 1, 19, 0),
      allDay: true,
      className: "bg-red",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 6,
      title: "Digital event",
      start: new Date(this.y, this.m, 21),
      allDay: true,
      className: "bg-warning",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 7,
      title: "Marketing event",
      start: new Date(this.y, this.m, 21),
      allDay: true,
      className: "bg-purple",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 8,
      title: "Dinner with Family",
      start: new Date(this.y, this.m, 19),
      allDay: true,
      className: "bg-red",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 9,
      title: "Black Friday",
      start: new Date(this.y, this.m, 23),
      allDay: true,
      className: "bg-blue",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },

    {
      id: 10,
      title: "Cyber Week",
      start: new Date(this.y, this.m, 2),
      allDay: true,
      className: "bg-yellow",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    }
  ];

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
    this.getCharts();
    this.initCalendar();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chartScheduler1) {
          console.log('Chart disposed')
          this.chartScheduler1.dispose()
        }
        if (this.chartScheduler2) {
          console.log('Chart disposed')
          this.chartScheduler2.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartScheduler3DStacked1()
      this.getChartScheduler3DPie1()
    })
  }

  getChartScheduler3DStacked1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartscheduler3Dstacked1", am4charts.XYChart3D);

    // Add data
    chart.data = [{
        "country": "Jan",
        "year2017": 3.5,
        "year2018": 4.2
    }, {
        "country": "Feb",
        "year2017": 1.7,
        "year2018": 3.1
    }, {
        "country": "Mar",
        "year2017": 2.8,
        "year2018": 2.9
    }, {
        "country": "Apr",
        "year2017": 2.6,
        "year2018": 2.3
    }, {
        "country": "May",
        "year2017": 1.4,
        "year2018": 2.1
    }, {
        "country": "June",
        "year2017": 2.6,
        "year2018": 4.9
    }, {
        "country": "July",
        "year2017": 6.4,
        "year2018": 7.2
    }, {
        "country": "Aug",
        "year2017": 8,
        "year2018": 7.1
    }, {
        "country": "Sep",
        "year2017": 9.9,
        "year2018": 10.1
    }, {
        "country": "Oct",
        "year2017": 1.7,
        "year2018": 3.1
    }, {
        "country": "Nov",
        "year2017": 2.8,
        "year2018": 2.9
    }, {
        "country": "Dec",
        "year2017": 2.6,
        "year2018": 2.3
    }, ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "GDP growth rate";
    valueAxis.renderer.labels.template.adapter.add("text", function(text) {
      return text + "%";
    });

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "year2017";
    series.dataFields.categoryX = "country";
    series.name = "Year 2017";
    series.clustered = false;
    series.columns.template.tooltipText = "GDP grow in {category} (2017): [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.9;

    let series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.dataFields.valueY = "year2018";
    series2.dataFields.categoryX = "country";
    series2.name = "Year 2018";
    series2.clustered = false;
    series2.columns.template.tooltipText = "GDP grow in {category} (2017): [bold]{valueY}[/]";

    this.chartScheduler1 = chart
  }

  getChartScheduler3DPie1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartscheduler3Dpie1", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        country: "High",
        litres: 501.9
      },
      {
        country: "Medium",
        litres: 301.9
      },
      {
        country: "Low",
        litres: 201.1
      },
    ];

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";

    this.chartScheduler2 = chart
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

  changeView(newView) {
    this.calendar.changeView(newView);

    currentDate: this.calendar.view.title;
  }

  initCalendar() {
    this.calendar = new Calendar(document.getElementById("calendar"), {
      plugins: [interaction, dayGridPlugin],
      defaultView: "dayGridMonth",
      selectable: true,
      editable: true,
      events: this.events,
      views: {
        month: {
          titleFormat: { month: "long", year: "numeric" }
        },
        agendaWeek: {
          titleFormat: { month: "long", year: "numeric", day: "numeric" }
        },
        agendaDay: {
          titleFormat: { month: "short", year: "numeric", day: "numeric" }
        }
      },
      // Add new event
      select: info => {
        this.addModal = this.modalService.show(this.modalAdd, this.default);
        this.startDate = info.startStr;
        this.endDate = info.endStr;
      },
      // Edit calendar event action
      eventClick: ({ event }) => {
        this.eventId = event.id;
        this.eventTitle = event.title;
        this.eventDescription = event.extendedProps.description;
        this.radios = "bg-danger";
        this.event = event;
        this.editModal = this.modalService.show(this.modalEdit, this.default);
      }
    });
    this.calendar.render();
  }
  getNewEventTitle(e) {
    this.eventTitle = e.target.value;
  }
  getNewEventDescription(e) {
    this.eventDescription = e.target.value;
  }
  addNewEvent() {
    this.events.push({
      title: this.eventTitle,
      start: this.startDate,
      end: this.endDate,
      className: this.radios,
      id: this.events.length
    });
    this.calendar.addEvent({
      title: this.eventTitle,
      start: this.startDate,
      end: this.endDate,
      className: this.radios,
      id: this.events.length
    });
    this.addModal.hide();
    this.radios = "bg-danger";
    (this.eventTitle = undefined),
      (this.eventDescription = undefined),
      (this.eventId = undefined),
      (this.event = undefined);
  }
  deleteEventSweetAlert() {
    this.editModal.hide();
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        cancelButtonClass: "btn btn-secondary",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false
      })
      .then(result => {
        if (result.value) {
          this.events = this.events.filter(
            prop => prop.id + "" !== this.eventId
          );
          this.initCalendar();
          swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            confirmButtonClass: "btn btn-primary",
            buttonsStyling: false
          });
        }
      });
    this.radios = "bg-danger";
    (this.eventTitle = undefined),
      (this.eventDescription = undefined),
      (this.eventId = undefined),
      (this.event = undefined);
  }
  updateEvent() {
    this.events = this.events.map((prop, key) => {
      if (prop.id + "" === this.eventId + "") {
        return {
          ...prop,
          title: this.eventTitle,
          className: this.radios,
          description: this.eventDescription
        };
      } else {
        return prop;
      }
    });
    this.radios = "bg-danger";
    (this.eventTitle = undefined),
      (this.eventDescription = undefined),
      (this.eventId = undefined),
      (this.event = undefined);
    this.initCalendar();
    this.editModal.hide();
  }

}
