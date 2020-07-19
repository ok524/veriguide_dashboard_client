// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Models
import { UserTableItemModel } from '../models/usertable-item.model';

const API_DATATABLE_URL = `http://${window.location.host}/documents/get_user?user_id=`;

@Injectable()
export class UserTableService {
  /**
	 * Service Constructor
	 *
	 * @param http: HttpClient
	 */
  constructor(private http: HttpClient) { }

  /**
	 * Returns data from fake server
	 */
  getAllItems(user_id): Observable<UserTableItemModel[]> {
    return this.http.get<UserTableItemModel[]>(API_DATATABLE_URL + user_id);
  }
}
