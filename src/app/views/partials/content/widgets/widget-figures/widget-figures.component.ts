// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Charts
import { Chart } from 'chart.js/dist/Chart.min.js';

@Component({
  selector: 'kt-widget-figures',
  templateUrl: './widget-figures.component.html',
  styleUrls: ['./widget-figures.component.scss']
})
export class WidgetFiguresComponent implements OnInit {
  // Public properties
  @Input() title: string;
  @Input() desc: string;
  @ViewChild('chart', {static: true}) chart: ElementRef;

  private _item; // private property _item
  the_chart :any;

  // use getter setter to define the property
  get data(): any {
    return this._item;
  }

  @Input()
  set data(val: any) {
    this._item = val;
    if (this.the_chart) {
      this.the_chart.data.datasets[0].data = val.datasets;
      this.the_chart.data.labels = val.labels;
      this.the_chart.update()
    }
  }

  constructor() {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.initChartJS();
  }

  /** Init chart */
  initChartJS() {
    // For more information about the chartjs, visit this link
    // https://www.chartjs.org/docs/latest/getting-started/usage.html

    let config = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: this.data.datasets,
          backgroundColor: [
            '#0abb87',
            '#ffb822',
            '#fd397a',
            '#3d94fb',
            '#282a3c',
            '#5867dd',
            '#34bfa3',
            '#3d94fb',
            '#fd27eb',
            '#c5cbe3',
            '#a1a8c3',
            '#3d4465',
            '#3e4466',
            '#f0f3ff',
            '#d9dffa',
            '#afb4d4',
            '#646c9a',
          ]
        }],
        labels: this.data.labels
      },
      options: {
        cutoutPercentage: 75,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          position: 'bottom',
        },
        title: {
          display: false,
          text: this.title
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          enabled: true,
          intersect: false,
          mode: 'nearest',
          bodySpacing: 5,
          yPadding: 10,
          xPadding: 10,
          caretPadding: 0,
          displayColors: false,
          backgroundColor: '#5d78ff',
          titleFontColor: '#ffffff',
          cornerRadius: 4,
          footerSpacing: 0,
          titleSpacing: 0
        },
        pieceLabel: {
          render: 'label',
          arc: true,
          fontColor: '#000',
          position: 'outside'
        },
      }
    };

    if (!this.the_chart) {
      this.the_chart = new Chart(this.chart.nativeElement, config);
    }
  }

}
