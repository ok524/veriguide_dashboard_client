// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// Charts
import { Chart } from 'chart.js/dist/Chart.min.js';

@Component({
  selector: 'kt-widgetRadar',
  templateUrl: './widgetRadar.component.html',
  styleUrls: ['./widgetRadar.component.scss'],
})
export class WidgetRadarComponent implements OnInit {
  // Public properties
  @Input() title: string;
  @Input() desc: string;
  @Input() data: { labels: string[]; datasets: any[] };
  @ViewChild('chart', {static: true}) chart: ElementRef;

  /**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 */
  constructor(private layoutConfigService: LayoutConfigService) {
  }

  /**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

  /**
	 * On init
	 */
  ngOnInit() {
    if (!this.data) {
      this.data = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [{
          "label": "My First Dataset",
          "data": [65, 59, 90, 81, 56, 55, 40],
          "fill": true,
          "backgroundColor": "rgba(255, 99, 132, 0.2)",
          "borderColor": "rgb(255, 99, 132)",
          "pointBackgroundColor": "rgb(255, 99, 132)",
          "pointBorderColor": "#fff",
          "pointHoverBackgroundColor": "#fff",
          "pointHoverBorderColor": "rgb(255, 99, 132)"
      }, {
          "label": "My Second Dataset",
          "data": [28, 48, 40, 19, 96, 27, 100],
          "fill": true,
          "backgroundColor": "rgba(54, 162, 235, 0.2)",
          "borderColor": "rgb(54, 162, 235)",
	    "pointBackgroundColor": "rgb(54, 162, 235)",
	   "pointBorderColor": "#fff",
          "pointHoverBackgroundColor": "#fff",
          "pointHoverBorderColor": "rgb(54, 162, 235)"
      }]
      };
    }

    this.initChartJS();
  }

  /** Init chart */
  initChartJS() {
    // For more information about the chartjs, visit this link
    // https://www.chartjs.org/docs/latest/getting-started/usage.html
Chart.defaults.global.defaultFontSize= 16;
    const chart = new Chart(this.chart.nativeElement, {
      type: 'radar',
      data: this.data,
      options: {
         title: {
	 display: true,
	 text: 'Overall Performance',
	 fontSize: 18,
	 padding: 6
	   },

        // tooltips: {
        //   intersect: false,
        //   mode: 'nearest',
        //   xPadding: 10,
        //   yPadding: 10,
        //   caretPadding: 10
        // },
         legend: {
          display: false
         },
         responsive: true,
        // maintainAspectRatio: false,
        // barRadius: 4,
	// scales: {
	 // xAxes: [{
	   // display: false,
	     //  gridLines: false,
	     //     stacked: true
        //   }],
        //   yAxes: [{
        //     display: false,
        //     stacked: true,
        //     gridLines: false
        //   }]
        // },
         layout: {
           padding: {
             left: 0,
             right: 30,
             top: 0,
             bottom: 0
           }
	 },
	   scale: {
	     gridLines:{
	        circular: true
		},
		pointLabels:{
			fontSize: 16
		},
	     ticks:{
	        beginAtZero: true,
		max: 100,
		min: 0,
		stepSize: 20
	     }

	   }
      }
    });
  }
}
