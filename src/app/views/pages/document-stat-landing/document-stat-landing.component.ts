import { Component, OnInit } from '@angular/core';
import { Config, ChartData, ChartDataDisplay, DocumentStatService } from '../../../data/document-stat.service';

@Component({
  selector: 'kt-document-stat-landing',
  templateUrl: './document-stat-landing.component.html',
  providers: [ DocumentStatService ],
  styleUrls: ['./document-stat-landing.component.scss']
})
export class DocumentStatLandingComponent {
  error: any;
  config: Config;
  chartData: ChartDataDisplay;

  constructor(private documentStatService: DocumentStatService) { }

  ngOnInit() {
    this.showConfig();
    this.showChartData();
  }

  showConfig() {
    this.documentStatService.getConfig()
      .subscribe(
        (data: Config) => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  showChartData() {
    this.documentStatService.getChartData()
      .subscribe(
        (data: ChartData) => this.chartData = {
          ...data,
          lexical_diversity: parseFloat((data.lexical_diversity.valueOf() * 100).toString()).toFixed(2) + '%',
          data_fdist: {
            labels: Object.keys(data.data_fdist)
              .map(o => {
                return {
                  "key": o,
                  "val": data.data_fdist[o]
                }
              })
              .sort((a,b) => b.val - a.val)
              .slice(0, 10)
              .map(o => o.key),
            datasets: Object.keys(data.data_fdist)
              .map(o => {
                return {
                  "key": o,
                  "val": data.data_fdist[o]
                }
              })
              .sort((a,b) => b.val - a.val)
              .slice(0, 10)
              .map(o => parseFloat(parseFloat("" + o.val * 100).toFixed(2))),
          }
        }, // success path
        error => this.error = error // error path
      );
  }

}
