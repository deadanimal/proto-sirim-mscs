import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_material from "@amcharts/amcharts4/themes/material";
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
  selector: 'app-application-review',
  templateUrl: './application-review.component.html',
  styleUrls: ['./application-review.component.scss']
})
export class ApplicationReviewComponent implements OnInit, OnDestroy {

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
     period: "2 Years",
     time: "9.00 AM"
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
     period: "5 Years",
     time: "10.00 AM"
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
     period: "2 Years",
     time: "9.45 AM"
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
     period: "5 Years",
     time: "2.00 PM"
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
     period: "2 Years",
     time: "11.00 AM"
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
     period: "5 Years",
     time: "9.00 AM"
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
     period: "2 Years",
     time: "9.00 AM"
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
     period: "5 Years",
     time: "9.00 AM"
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
     period: "2 Years",
     time: "9.00 AM"
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
     period: "5 Years",
     time: "9.00 AM"
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
     period: "2 Years",
     time: "9.00 AM"
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
     period: "5 Years",
     time: "9.00 AM"
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
     period: "2 Years",
     time: "9.00 AM"
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
     period: "5 Years",
     time: "9.00 AM"
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
     period: "2 Years",
     time: "9.00 AM"
   },
   ];
   SelectionType = SelectionType;
 
   //modal
   modalRef: BsModalRef;
 
   //chart
   private chartAR1: any
   private chartAR2: any
 
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
         if (this.chartAR1) {
           console.log('Chart disposed')
           this.chartAR1.dispose()
         }
         if (this.chartAR2) {
           console.log('Chart disposed')
           this.chartAR2.dispose()
         }
       }
     )
   }
 
   getCharts() {
     this.zone.runOutsideAngular(() => {
       this.getChartARPie1()
       this.getChartARBar1()
     })
   }

   getChartARPie1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartARpie1", am4charts.PieChart);

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

    this.chartAR1 = chart
   }

   getChartARBar1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartARbar1", am4charts.XYChart);

    // Add data
    chart.data = [{
      "country": "Fail",
      "visits": 2025
    }, {
      "country": "Pass",
      "visits": 1882
    }, {
      "country": "Observation",
      "visits": 1809
    }, {
      "country": "N/A",
      "visits": 1322
    }, ];

    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      if ((target.dataItem && target.dataItem.index & 2) == 2) {
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

    this.chartAR2 = chart
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
