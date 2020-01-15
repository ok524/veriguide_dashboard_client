import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Config, ChartData, ChartDataDisplay, DocumentStatService } from '../../../core/_base/layout/services/document-stat.service';

@Component({
  selector: 'kt-document-stat-landing',
  templateUrl: './document-stat-landing.component.html',
  styleUrls: ['./document-stat-landing.component.scss']
})
export class DocumentStatLandingComponent {
  error: any;
  config: Config;
  chartData: ChartDataDisplay;
  submissionId: string;

  constructor(
    private documentStatService: DocumentStatService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.submissionId = this.route.snapshot.params['submissionId'];
    this.route.params.subscribe( params => {
      this.submissionId = params['submissionId'];
      this.showChartData(this.submissionId);
    });
    this.showConfig();
    this.showChartData(this.submissionId);
  }

  showConfig() {
    this.documentStatService.getConfig()
      .subscribe(
        (data: Config) => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  showChartData(submissionId :string) {
    this.documentStatService.getChartData(submissionId || "10000001")
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
