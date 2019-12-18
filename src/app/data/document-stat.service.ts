import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  heroesUrl: string;
  textfile: string;
}

export interface ChartData {
  widget_layout: Array<Array<Object>>;
  submission_id: string;
  submission_timestamp: Number;
  job_timestamp: Number;
  length_by_sentence: Number;
  length_by_distict_token: Number;
  length_by_word: Number;
  length_by_character: Number;
  lexical_diversity: Number;
  data_split_by_sentence: Array<string>;
  data_fdist: Object;
}

export interface ChartDataDisplay {
  widget_layout: Array<Array<Object>>;
  submission_id: string;
  submission_timestamp: Number;
  job_timestamp: Number;
  length_by_sentence: Number;
  length_by_distict_token: Number;
  length_by_word: Number;
  length_by_character: Number;
  lexical_diversity: string;
  data_split_by_sentence: Array<string>;
  data_fdist: Object;
}

@Injectable()
export class DocumentStatService {
  configUrl = 'assets/data/config.json';
  // dataUrl = 'assets/data/demo_doc_stat_en_v01.json'
  dataUrl = 'assets/data/demo_doc_stat_chi_v01.json'

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  getChartData() {
    return this.http.get<ChartData>(this.dataUrl);
  }
}
