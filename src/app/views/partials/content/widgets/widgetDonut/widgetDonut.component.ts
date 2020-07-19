// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// Charts
import { Chart } from 'chart.js/dist/Chart.min.js';

@Component({
  selector: 'kt-widgetDonut',
  templateUrl: './widgetDonut.component.html',
  styleUrls: ['./widgetDonut.component.scss'],
})
export class WidgetDonutComponent implements OnInit {
  // Public properties
  @Input() title: string;
  @Input() desc: string;
  @Input() data: { labels: string[]; datasets: any[] };
 @Input() value: number;
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
        labels: ["Overall Performance", ""],
        datasets: [{
          "label": "Your Essay",
          "data": [75, 25],
          "fill": true,
          "backgroundColor": ["rgba(246, 36, 89, 1)","rgba(232, 232, 232, 1)"],
          "borderColor": "rgb(255, 99, 132)",
          "hoverBackgroundColor": "rgb(255, 99, 132)",
          "hoverBorderColor": "#fff",
      }]
      }
      }

Chart.plugins.register({
beforeDraw: function(chart) {
if(chart.data.labels[1]==""){
        var data = chart.data.datasets[0].data;
        var sum = data.reduce(function(a, b) {
            return a + b;
        }, 0);
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
        ctx.restore();
        var fontSize = (height / 10).toFixed(2);
        ctx.font = fontSize + "px Arial";
        ctx.textBaseline = "middle";
        var text = chart.data.datasets[0].data[0]+"%",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = (height / 2) + 20;
        ctx.fillText(text, textX, textY);
        ctx.save();
	}
	}
});



    

    this.initChartJS();
  }

  /** Init chart */
 initChartJS() {
    // For more information about the chartjs, visit this link
    // https://www.chartjs.org/docs/latest/getting-started/usage.html

    const chart = new Chart(this.chart.nativeElement, {
      type: 'doughnut',
      data: this.data,
      options: {
         title: {
	 display: true,
	 fontSize: 18,
	 padding: 10,
	 text: 'Overall Score'
	   },
	 cutoutPercentage: 70,
	 animation:{
	   	animateRotate: true,
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
        //   xAxes: [{
        //     display: false,
        //     gridLines: false,
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
	   right: 0,
	   top: 0,
	   bottom: 0
	  }
	 }
      }
      });
  }
}
