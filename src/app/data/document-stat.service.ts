import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  heroesUrl: string;
  textfile: string;
}

export interface ChartData {
  // widgetLayout: Array<Array<Object>>;
  submissionId: Number;
  submissionTime: Number;
  jobTime: Number;
  lengthBySentence: Number;
  lengthByDistictToken: Number;
  lengthByWord: Number;
  lengthByCharacter: Number;
  lexicalDiversity: Number;
  dataBySentence: Array<string>;
  dataByFdist: Array<{
    [key: string]: string | number
  }>;
}

export interface ChartDataDisplay {
  // widgetLayout: Array<Array<Object>>;
  submissionId: Number;
  submissionTime: Number;
  jobTime: Number;
  lengthBySentence: Number;
  lengthByDistictToken: Number;
  lengthByWord: Number;
  lengthByCharacter: Number;
  lexicalDiversity: string;
  dataBySentence: Array<string>;
  dataByFdist: {
    labels: string[],
    datasets: number[]
  };
}

@Injectable()
export class DocumentStatService {
  configUrl = 'assets/data/config.json';
  // dataUrl = 'assets/data/demo_doc_stat_en_v01.json'
  dataUrl = 'http://192.168.1.29:8091/veriguide_dashboard/stat/documents/10000009'
  // dataUrl = 'assets/data/10000009.json'

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  getChartData() {
    return this.http.get<ChartData>(this.dataUrl);
  }
}
