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
  selector: 'app-quotation-invoice',
  templateUrl: './quotation-invoice.component.html',
  styleUrls: ['./quotation-invoice.component.scss']
})
export class QuotationInvoiceComponent implements OnInit, OnDestroy {

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
  private chartquotation1: any
  private chartquotation2: any

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
        if (this.chartquotation1) {
          console.log('Chart disposed')
          this.chartquotation1.dispose()
        }
        if (this.chartquotation2) {
          console.log('Chart disposed')
          this.chartquotation2.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartQuotationPie1()
      this.getChartQuotationStacked1()
    })
  }
  
  getChartQuotationPie1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartquotationpie1", am4charts.PieChart);

    // Add data
    chart.data = [ {
      "country": "Reporting",
      "litres": 501.9
    }, {
      "country": "Governance & Assurance",
      "litres": 301.9
    }, {
      "country": "Key Financial Systems",
      "litres": 201.1
    }, {
      "country": "Project Management",
      "litres": 165.8
    },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);

    this.chartquotation1 = chart
  }

  getChartQuotationStacked1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartquotationstacked1", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        category: "Jan",
        value1: 1,
        value2: 5,
        value3: 3
      },
      {
        category: "Feb",
        value1: 2,
        value2: 5,
        value3: 3
      },
      {
        category: "Mar",
        value1: 3,
        value2: 5,
        value3: 4
      },
      {
        category: "Apr",
        value1: 4,
        value2: 5,
        value3: 6
      },
      {
        category: "May",
        value1: 3,
        value2: 5,
        value3: 4
      },
      {
        category: "June",
        value1: 2,
        value2: 13,
        value3: 1
      },
      {
        category: "July",
        value1: 1,
        value2: 5,
        value3: 3
      },
      {
        category: "Aug",
        value1: 2,
        value2: 5,
        value3: 3
      },
      {
        category: "Sep",
        value1: 3,
        value2: 5,
        value3: 4
      },
      {
        category: "Oct",
        value1: 4,
        value2: 5,
        value3: 6
      },
      {
        category: "Nov",
        value1: 3,
        value2: 5,
        value3: 4
      },
      {
        category: "Dec",
        value1: 2,
        value2: 13,
        value3: 1
      },
    ];

    chart.colors.step = 2;
    chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;


    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series1.name = "Series 1";
    series1.dataFields.categoryX = "category";
    series1.dataFields.valueY = "value1";
    series1.dataFields.valueYShow = "totalPercent";
    series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    series1.tooltip.pointerOrientation = "vertical";

    let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet1.label.fill = am4core.color("#ffffff");
    bullet1.locationY = 0.5;

    let series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series2.name = "Series 2";
    series2.dataFields.categoryX = "category";
    series2.dataFields.valueY = "value2";
    series2.dataFields.valueYShow = "totalPercent";
    series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;
    series2.tooltip.pointerOrientation = "vertical";

    let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationY = 0.5;
    bullet2.label.fill = am4core.color("#ffffff");

    let series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.columns.template.width = am4core.percent(80);
    series3.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series3.name = "Series 3";
    series3.dataFields.categoryX = "category";
    series3.dataFields.valueY = "value3";
    series3.dataFields.valueYShow = "totalPercent";
    series3.dataItems.template.locations.categoryX = 0.5;
    series3.stacked = true;
    series3.tooltip.pointerOrientation = "vertical";

    let bullet3 = series3.bullets.push(new am4charts.LabelBullet());
    bullet3.interactionsEnabled = false;
    bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet3.locationY = 0.5;
    bullet3.label.fill = am4core.color("#ffffff");

    chart.scrollbarX = new am4core.Scrollbar();

    this.chartquotation2 = chart
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
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
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

  successSubmit() {
    swal.fire({
      title: "Submitted",
      text: "The data have been successfully submitted",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    });
  }
}
