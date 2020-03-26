// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { RouterLink } from '@angular/router';
// RXJS
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
// Crud
import { QueryParamsModel } from '../../../../../../core/_base/crud';
// Layout
import { UserTableItemModel, UserTableService } from '../../../../../../core/_base/layout';
import { UserTableDataSource } from './user-table.data-source';
// Moment
import * as moment from 'moment';

@Component({
  selector: 'kt-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  // Public properties
  dataSource: UserTableDataSource;
  displayedColumns = [
    'id',
    'submission_id',
    'uuid',
    // 'user_id',
    'process_status',
    'created',
  ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  selection = new SelectionModel<UserTableItemModel>(true, []);

  /**
   * Component constructor
   *
   * @param UserTableService: UserTableService
   */
  constructor(private UserTableService: UserTableService) {}

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    /* Data load will be triggered in two cases:
    - when a pagination event occurs => this.paginator.page
    - when a sort event occurs => this.sort.sortChange
    **/
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadItems();
        })
      )
      .subscribe();

    // Init DataSource
    this.dataSource = new UserTableDataSource(this.UserTableService);
    // First load
    this.sort.direction = "desc";
    this.sort.active = "submissionId";
    this.loadItems(true);
  }

  /**
   * Load items
   *
   * @param firstLoad: boolean
   */
  loadItems(firstLoad: boolean = false) {
    const queryParams = new QueryParamsModel(
      {},
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      firstLoad ? 6 : this.paginator.pageSize
    );
    this.dataSource.loadItems(queryParams);
    this.selection.clear();
  }

  /* UI */

  /**
   * Returns item status
   *
   * @param status: number
   */
  getItemStatusString(status: number = 0): string {
    switch (status) {
      case 0:
        return 'Selling';
      case 1:
        return 'Sold';
    }
    return '';
  }

  /**
   * Returens item CSS Class Name by status
   *
   * @param status: number
   */
  getItemCssClassByStatus(status: number = 0): string {
    switch (status) {
      case 0:
        return 'success';
      case 1:
        return 'info';
    }
    return '';
  }

  /**
   * Returns item condition
   *
   * @param condition: number
   */
  getItemConditionString(condition: number = 0): string {
    switch (condition) {
      case 0:
        return 'New';
      case 1:
        return 'Used';
    }
    return '';
  }

  /**
   * Returns CSS Class name by condition
   *
   * @param condition: number
   */
  getItemCssClassByCondition(condition: number = 0): string {
    switch (condition) {
      case 0:
        return 'success';
      case 1:
        return 'info';
    }
    return '';
  }

  getHumanReadableDatetime(time: any): string {
    return moment(time).format('LLL')
  }

  trimUUID(uuid: string) {
    return `${uuid.slice(0,7)}...`;
  }
}
