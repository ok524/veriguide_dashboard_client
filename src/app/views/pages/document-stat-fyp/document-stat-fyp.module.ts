// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DocumentStatFypComponent } from './document-stat-fyp.component';

import { MatIconRegistry } from '@angular/material/icon';
import { MatInputModule, MatFormFieldModule, MatIconModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DocumentStatFypComponent],
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: DocumentStatFypComponent
      },
    ]),
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MatIconRegistry,
  ]
})
export class DocumentStatFypModule { }
