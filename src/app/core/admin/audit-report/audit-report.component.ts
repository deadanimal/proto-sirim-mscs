import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
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
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.scss']
})
export class AuditReportComponent implements OnInit, OnDestroy {

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

  //chart
  private chartauditreport1: any
  private chartauditreport2: any

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
    this.getCharts()
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chartauditreport1) {
          console.log('Chart disposed')
          this.chartauditreport1.dispose()
        }
        if (this.chartauditreport2) {
          console.log('Chart disposed')
          this.chartauditreport2.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartAuditReportGantt1()
      this.getChartAuditReportDonut1()
    })
  }

  getChartAuditReportGantt1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartauditreportgantt1", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [ {
      "category": "Project #1",
      "start": "2016-01-01",
      "end": "2016-01-14",
      "color": colorSet.getIndex(0).brighten(0),
      "task": "Gathering requirements"
    }, {
      "category": "Project #1",
      "start": "2016-01-16",
      "end": "2016-01-27",
      "color": colorSet.getIndex(0).brighten(0.4),
      "task": "Producing specifications"
    }, {
      "category": "Project #1",
      "start": "2016-02-05",
      "end": "2016-04-18",
      "color": colorSet.getIndex(0).brighten(0.8),
      "task": "Development"
    }, {
      "category": "Project #1",
      "start": "2016-04-18",
      "end": "2016-04-30",
      "color": colorSet.getIndex(0).brighten(1.2),
      "task": "Testing and QA"
    }, {
      "category": "Project #2",
      "start": "2016-01-08",
      "end": "2016-01-10",
      "color": colorSet.getIndex(2).brighten(0),
      "task": "Gathering requirements"
    }, {
      "category": "Project #2",
      "start": "2016-01-12",
      "end": "2016-01-15",
      "color": colorSet.getIndex(2).brighten(0.4),
      "task": "Producing specifications"
    }, {
      "category": "Project #2",
      "start": "2016-01-16",
      "end": "2016-02-05",
      "color": colorSet.getIndex(2).brighten(0.8),
      "task": "Development"
    }, {
      "category": "Project #2",
      "start": "2016-02-10",
      "end": "2016-02-18",
      "color": colorSet.getIndex(2).brighten(1.2),
      "task": "Testing and QA"
    }, {
      "category": "Project #3",
      "start": "2016-01-02",
      "end": "2016-01-08",
      "color": colorSet.getIndex(4).brighten(0),
      "task": "Gathering requirements"
    }, {
      "category": "Project #3",
      "start": "2016-01-08",
      "end": "2016-01-16",
      "color": colorSet.getIndex(4).brighten(0.4),
      "task": "Producing specifications"
    }, {
      "category": "Project #3",
      "start": "2016-01-19",
      "end": "2016-03-01",
      "color": colorSet.getIndex(4).brighten(0.8),
      "task": "Development"
    }, {
      "category": "Project #3",
      "start": "2016-03-12",
      "end": "2016-04-05",
      "color": colorSet.getIndex(4).brighten(1.2),
      "task": "Testing and QA"
    }, {
      "category": "Project #4",
      "start": "2016-01-01",
      "end": "2016-01-19",
      "color": colorSet.getIndex(6).brighten(0),
      "task": "Gathering requirements"
    }, {
      "category": "Project #4",
      "start": "2016-01-19",
      "end": "2016-02-03",
      "color": colorSet.getIndex(6).brighten(0.4),
      "task": "Producing specifications"
    }, {
      "category": "Project #4",
      "start": "2016-03-20",
      "end": "2016-04-25",
      "color": colorSet.getIndex(6).brighten(0.8),
      "task": "Development"
    }, {
      "category": "Project #4",
      "start": "2016-04-27",
      "end": "2016-05-15",
      "color": colorSet.getIndex(6).brighten(1.2),
      "task": "Testing and QA"
    }, {
      "category": "Project #5",
      "start": "2016-01-01",
      "end": "2016-01-12",
      "color": colorSet.getIndex(8).brighten(0),
      "task": "Gathering requirements"
    }, {
      "category": "Project #5",
      "start": "2016-01-12",
      "end": "2016-01-19",
      "color": colorSet.getIndex(8).brighten(0.4),
      "task": "Producing specifications"
    }, {
      "category": "Project #5",
      "start": "2016-01-19",
      "end": "2016-03-01",
      "color": colorSet.getIndex(8).brighten(0.8),
      "task": "Development"
    }, {
      "category": "Project #5",
      "start": "2016-03-08",
      "end": "2016-03-30",
      "color": colorSet.getIndex(8).brighten(1.2),
      "task": "Testing and QA"
    } ];

    chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: "day" };
    // dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
    //dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.height = am4core.percent(70);
    series1.columns.template.tooltipText = "{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

    series1.dataFields.openDateX = "start";
    series1.dataFields.dateX = "end";
    series1.dataFields.categoryY = "category";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
    series1.columns.template.strokeOpacity = 1;

    chart.scrollbarX = new am4core.Scrollbar();

    this.chartauditreport1 = chart
  }

  getChartAuditReportDonut1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartauditreportdonut1", am4charts.PieChart);

    // Add data
    chart.data = [{
      "country": "Satisfactory",
      "litres": 501.9
    }, {
      "country": "Unsatisfactory",
      "litres": 301.9
    }, {
      "country": "Need Significant Explanation",
      "litres": 201.1
    }, {
      "country": "Need Some Idea",
      "litres": 165.8
    }, ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.innerRadius = am4core.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    let rgm = new am4core.RadialGradientModifier();
    rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

    this.chartauditreport2 = chart
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
