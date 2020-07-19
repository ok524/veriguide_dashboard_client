// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Models
import { SubmissionTableItemModel } from '../models/submissiontable-item.model';

const API_DATATABLE_URL = 'http://192.168.1.29:8091/veriguide_dashboard/stat/users/admin/part';

@Injectable()
export class SubmissionTableService {
  /**
	 * Service Constructor
	 *
	 * @param http: HttpClient
	 */
  constructor(private http: HttpClient) { }

  /**
	 * Returns data from fake server
	 */
  getAllItems(): Observable<SubmissionTableItemModel[]> {
    return this.http.get<SubmissionTableItemModel[]>(API_DATATABLE_URL);
  }
}
