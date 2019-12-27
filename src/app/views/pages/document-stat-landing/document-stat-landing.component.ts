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
          lexicalDiversity: parseFloat((data.lexicalDiversity.valueOf() * 100).toFixed(2)) + '%',
          dataByFdist: {
            labels: data.dataByFdist.slice(0, 10).map(o => o.key.toString()),
            datasets: data.dataByFdist.slice(0, 10).map(o => {
              return parseFloat((Number(o.val) * 100).toFixed(2))
            })
          }
        }, // success path
        error => this.error = error // error path
      );
  }

}
