import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";
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
  selector: 'app-request-for-information',
  templateUrl: './request-for-information.component.html',
  styleUrls: ['./request-for-information.component.scss']
})
export class RequestForInformationComponent implements OnInit, OnDestroy {

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
  private chartRFI1: any
  private chartRFI2: any
  private chartRFI3: any

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
        if (this.chartRFI1) {
          console.log('Chart disposed')
          this.chartRFI1.dispose()
        }
        if (this.chartRFI2) {
          console.log('Chart disposed')
          this.chartRFI2.dispose()
        }
        if (this.chartRFI3) {
          console.log('Chart disposed')
          this.chartRFI3.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartRFITimeline1()
      this.getChartRFILine1()
      this.getChartRFIBar1 ()
    })
  }

  getChartRFITimeline1 () {
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chartGrantMonitoringTimeline1 = am4core.create("chartRFItimeline1", am4plugins_timeline.SerpentineChart);
    chartGrantMonitoringTimeline1.curveContainer.padding(50, 20, 50, 20);
    chartGrantMonitoringTimeline1.levelCount = 4;
    chartGrantMonitoringTimeline1.yAxisRadius = am4core.percent(25);
    chartGrantMonitoringTimeline1.yAxisInnerRadius = am4core.percent(-25);
    chartGrantMonitoringTimeline1.maskBullets = false;

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.5;

    chartGrantMonitoringTimeline1.data = [{
        "category": "Module #1",
        "start": "2019-01-10",
        "end": "2019-01-13",
        "color": colorSet.getIndex(0),
        "task": "Gathering requirements"
    }, {
        "category": "Module #1",
        "start": "2019-02-05",
        "end": "2019-04-18",
        "color": colorSet.getIndex(0),
        "task": "Development"
    }, {
        "category": "Module #2",
        "start": "2019-01-08",
        "end": "2019-01-10",
        "color": colorSet.getIndex(5),
        "task": "Gathering requirements"
    }, {
        "category": "Module #2",
        "start": "2019-01-12",
        "end": "2019-01-15",
        "color": colorSet.getIndex(5),
        "task": "Producing specifications"
    }, {
        "category": "Module #2",
        "start": "2019-01-16",
        "end": "2019-02-05",
        "color": colorSet.getIndex(5),
        "task": "Development"
    }, {
        "category": "Module #2",
        "start": "2019-02-10",
        "end": "2019-02-18",
        "color": colorSet.getIndex(5),
        "task": "Testing and QA"
    }, {
        "category": ""
    }, {
        "category": "Module #3",
        "start": "2019-01-01",
        "end": "2019-01-19",
        "color": colorSet.getIndex(9),
        "task": "Gathering requirements"    
    }, {
        "category": "Module #3",
        "start": "2019-02-01",
        "end": "2019-02-10",
        "color": colorSet.getIndex(9),
        "task": "Producing specifications"
    }, {
        "category": "Module #3",
        "start": "2019-03-10",
        "end": "2019-04-15",
        "color": colorSet.getIndex(9),
        "task": "Development"
    }, {
        "category": "Module #3",
        "start": "2019-04-20",
        "end": "2019-04-30",
        "color": colorSet.getIndex(9),
        "task": "Testing and QA",
        "disabled2":false,
        "image2":"/assets/img/theme/team-1.jpg",
        "location":0
    }, {
        "category": "Module #4",
        "start": "2019-01-15",
        "end": "2019-02-12",
        "color": colorSet.getIndex(15),
        "task": "Gathering requirements",
        "disabled1":false,
        "image1":"/assets/img/theme/team-4.jpg"
    }, {
        "category": "Module #4",
        "start": "2019-02-25",
        "end": "2019-03-10",
        "color": colorSet.getIndex(15),
        "task": "Development"
    }, {
        "category": "Module #4",
        "start": "2019-03-23",
        "end": "2019-04-29",
        "color": colorSet.getIndex(15),
        "task": "Testing and QA"
    }];

    chartGrantMonitoringTimeline1.dateFormatter.dateFormat = "yyyy-MM-dd";
    chartGrantMonitoringTimeline1.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    chartGrantMonitoringTimeline1.fontSize = 11;

    let yAxis = chartGrantMonitoringTimeline1.yAxes.push(new am4charts.CategoryAxis() as any);
    yAxis.title.text = "category";
    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.labels.template.paddingRight = 25;
    yAxis.renderer.minGridDistance = 10;
    yAxis.renderer.innerRadius = -60;
    yAxis.renderer.radius = 60;

    let dateAxis = chartGrantMonitoringTimeline1.xAxes.push(new am4charts.DateAxis() as any);
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: "day" };
    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.startLocation = -0.5;
    dateAxis.renderer.line.strokeDasharray = "1,4";
    dateAxis.renderer.line.strokeOpacity = 0.6;
    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    dateAxis.tooltip.label.paddingTop = 7;

    let labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fillOpacity = 0.7;
    labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor("background");
    labelTemplate.background.fillOpacity = 1;
    labelTemplate.padding(7, 7, 7, 7);

    let series = chartGrantMonitoringTimeline1.series.push(new am4plugins_timeline.CurveColumnSeries());
    series.columns.template.height = am4core.percent(20);
    series.columns.template.tooltipText = "{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

    series.dataFields.openDateX = "start";
    series.dataFields.dateX = "end";
    series.dataFields.categoryY = "category";
    series.columns.template.propertyFields.fill = "color"; // get color from data
    series.columns.template.propertyFields.stroke = "color";
    series.columns.template.strokeOpacity = 0;

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 3;
    bullet.circle.strokeOpacity = 0;
    bullet.propertyFields.fill = "color";
    bullet.locationX = 0;


    let bullet2 = series.bullets.push(new am4charts.CircleBullet());
    bullet2.circle.radius = 3;
    bullet2.circle.strokeOpacity = 0;
    bullet2.propertyFields.fill = "color";
    bullet2.locationX = 1;


    let imageBullet1 = series.bullets.push(new am4plugins_bullets.PinBullet());
    imageBullet1.disabled = true;
    imageBullet1.propertyFields.disabled = "disabled1";
    imageBullet1.locationX = 1;
    imageBullet1.circle.radius = 20;
    imageBullet1.propertyFields.stroke = "color";
    imageBullet1.background.propertyFields.fill = "color";
    imageBullet1.image = new am4core.Image();
    imageBullet1.image.propertyFields.href = "image1";

    let imageBullet2 = series.bullets.push(new am4plugins_bullets.PinBullet());
    imageBullet2.disabled = true;
    imageBullet2.propertyFields.disabled = "disabled2";
    imageBullet2.locationX = 0;
    imageBullet2.circle.radius = 20;
    imageBullet2.propertyFields.stroke = "color";
    imageBullet2.background.propertyFields.fill = "color";
    imageBullet2.image = new am4core.Image();
    imageBullet2.image.propertyFields.href = "image2";


    let eventSeries = chartGrantMonitoringTimeline1.series.push(new am4plugins_timeline.CurveLineSeries());
    eventSeries.dataFields.dateX = "eventDate";
    eventSeries.dataFields.categoryY = "category";
    eventSeries.data = [
        { category: "", eventDate: "2019-01-15", letter: "A", description: "Something happened here" },
        { category: "", eventDate: "2019-01-23", letter: "B", description: "Something happened here" },
        { category: "", eventDate: "2019-02-10", letter: "C", description: "Something happened here" },
        { category: "", eventDate: "2019-02-29", letter: "D", description: "Something happened here" },
        { category: "", eventDate: "2019-03-06", letter: "E", description: "Something happened here" },
        { category: "", eventDate: "2019-03-12", letter: "F", description: "Something happened here" },
        { category: "", eventDate: "2019-03-22", letter: "G", description: "Something happened here" }];
    eventSeries.strokeOpacity = 0;

    let flagBullet = eventSeries.bullets.push(new am4plugins_bullets.FlagBullet())
    flagBullet.label.propertyFields.text = "letter";
    flagBullet.locationX = 0;
    flagBullet.tooltipText = "{description}";

    chartGrantMonitoringTimeline1.scrollbarX = new am4core.Scrollbar();
    chartGrantMonitoringTimeline1.scrollbarX.align = "center"
    chartGrantMonitoringTimeline1.scrollbarX.width = am4core.percent(85);

    let cursor = new am4plugins_timeline.CurveCursor();
    chartGrantMonitoringTimeline1.cursor = cursor;
    cursor.xAxis = dateAxis;
    cursor.yAxis = yAxis;
    cursor.lineY.disabled = true;
    cursor.lineX.strokeDasharray = "1,4";
    cursor.lineX.strokeOpacity = 1;

    dateAxis.renderer.tooltipLocation2 = 0;
    yAxis.cursorTooltipEnabled = false;

    this.chartRFI1 = chartGrantMonitoringTimeline1
  }

  getChartRFILine1 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartRFIline1", am4charts.XYChart);

    // Add data
    chart.data = generateChartData();

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12,12,12,12)

    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    let abc = chart.scrollbarX as any;
    abc.series.push(series);

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    function generateChartData() {
        let chartData = [];
        let firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 1000);
        let visits = 1200;
        for (var i = 0; i < 500; i++) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            let newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);
            
            visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);

            chartData.push({
                date: newDate,
                visits: visits
            });
        }
        return chartData;
      }
    
    this.chartRFI2 = chart
  }

  getChartRFIBar1 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartRFIbar1", am4charts.XYChart);

    // Add data
    chart.data = [{
      "country": "Jan",
      "visits": 2025
    }, {
      "country": "Feb",
      "visits": 1882
    }, {
      "country": "Mar",
      "visits": 1809
    }, {
      "country": "Apr",
      "visits": 1322
    }, {
      "country": "May",
      "visits": 1122
    }, {
      "country": "June",
      "visits": 1114
    }, {
      "country": "July",
      "visits": 984
    }, {
      "country": "Aug",
      "visits": 711
    }, {
      "country": "Sep",
      "visits": 665
    }, {
      "country": "Oct",
      "visits": 580
    }, {
      "country": "Nov",
      "visits": 443
    }, {
      "country": "Dec",
      "visits": 441
    }, ];

    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      let wasd = target.dataItem as any;
      if ((wasd && wasd.index & 2 )== 2) {
        return dy + 25;
      }
      return dy;
    });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    this.chartRFI3 = chart
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
