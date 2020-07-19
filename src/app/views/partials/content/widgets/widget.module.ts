import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, } from '@angular/material';
import { CoreModule } from '../../../../core/core.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// Datatable
import { DataTableComponent } from './general/data-table/data-table.component';
import { SubmissionTableComponent } from './general/submission-table/submission-table.component';
import { UserTableComponent } from './general/user-table/user-table.component';
// General widgets
import { Widget1Component } from './widget1/widget1.component';
import { Widget4Component } from './widget4/widget4.component';
import { Widget5Component } from './widget5/widget5.component';
import { Widget12Component } from './widget12/widget12.component';
import { Widget15Component } from './widget15/widget15.component';
import { Widget14Component } from './widget14/widget14.component';
import { Widget26Component } from './widget26/widget26.component';
import { WidgetRadarComponent } from './widgetRadar/widgetRadar.component';
import { WidgetDonutComponent } from './widgetDonut/widgetDonut.component';
import { WidgetDonut2Component } from './widgetDonut2/widgetDonut2.component';
import { Timeline2Component } from './timeline2/timeline2.component';
import { WidgetFiguresComponent } from './widget-figures/widget-figures.component';

@NgModule({
  declarations: [
    DataTableComponent,
    SubmissionTableComponent,
    UserTableComponent,
    // Widgets
    Widget1Component,
    Widget4Component,
    Widget5Component,
    Widget12Component,
    Widget15Component,
    Widget14Component,
    Widget26Component,
    WidgetRadarComponent,
    WidgetDonutComponent,
    WidgetDonut2Component,
    Timeline2Component,
    WidgetFiguresComponent,
  ],
  exports: [
    DataTableComponent,
    SubmissionTableComponent,
    UserTableComponent,
    // Widgets
    Widget1Component,
    Widget4Component,
    Widget5Component,
    Widget12Component,
    Widget15Component,
    Widget14Component,
    Widget26Component,
    WidgetRadarComponent,
    WidgetDonutComponent,
    WidgetDonut2Component,
    Timeline2Component,
    WidgetFiguresComponent,
    RouterModule,
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    MatTableModule,
    CoreModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
  ]
})
export class WidgetModule {
}
