import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface UserData {
  id: string;
  submission_id: string;
  uuid: string;
  user_id: string;
  process_status: string;
  created: string;
}

export interface DocData {
  // widgetLayout: Array<Array<Object>>;
  exist: boolean;
  status: string;
  success: boolean;
  result: Array<{
    [key: string]: string | number
  }>;
}

export interface SubmitData {
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

@Injectable()
export class DocumentStatFypService {
  dataUrl = `http://${window.location.host}/documents`

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  // /get_user
  getUserData(user_id :string) {
    return this.http.get<UserData[]>(`${this.dataUrl}/get_user?user_id=${user_id}`);
  }

  // /get
  getDocData(uuid: string, submission_id: string) {
    return this.http.get<DocData>(`${this.dataUrl}/get?uuid=${uuid}&submission_id=${submission_id}`);
  }

  // /new
  putDocData(data: any) {
    return this.http.post<SubmitData>(`${this.dataUrl}/new`, data);
  }
}
