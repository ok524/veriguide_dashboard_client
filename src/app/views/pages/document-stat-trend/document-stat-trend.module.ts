// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DocumentStatTrendComponent } from './document-stat-trend.component';

@NgModule({
  declarations: [DocumentStatTrendComponent],
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: DocumentStatTrendComponent
      },
    ]),
  ]
})
export class DocumentStatTrendModule { }
