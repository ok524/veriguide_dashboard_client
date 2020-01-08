// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
// RXJS
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
// Crud
import { QueryParamsModel } from '../../../../../../core/_base/crud';
// Layout
import { SubmissionTableItemModel, SubmissionTableService } from '../../../../../../core/_base/layout';
import { SubmissionTableDataSource } from './submission-table.data-source';

@Component({
  selector: 'kt-submission-table',
  templateUrl: './submission-table.component.html',
  styleUrls: ['./submission-table.component.scss']
})
export class SubmissionTableComponent implements OnInit {
  // Public properties
  dataSource: SubmissionTableDataSource;
  displayedColumns = [
    'submissionId',
    'submissionTime',
    'jobTime',
    'lengthByWord',
    'actions',
  ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  selection = new SelectionModel<SubmissionTableItemModel>(true, []);

  /**
	 * Component constructor
	 *
	 * @param submissionTableService: SubmissionTableService
	 */
  constructor(private submissionTableService: SubmissionTableService) {}

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
    this.dataSource = new SubmissionTableDataSource(this.submissionTableService);
    // First load
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
}
