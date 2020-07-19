// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DocumentStatLandingComponent } from './document-stat-landing.component';

@NgModule({
  declarations: [DocumentStatLandingComponent],
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: DocumentStatLandingComponent
      },
    ]),
  ]
})
export class DocumentStatLandingModule { }
