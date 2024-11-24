import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizzComponent } from './quizz/quizz.component';
import { QuizzResultComponent } from './quizz-result/quizz-result.component';

import { FEATURE_NAME } from '../quizz-data-access/quizz-actions-types';
import { reducers } from '../quizz-data-access/quizz.reducers';
import { QuizzEffects } from '../quizz-data-access/quizz.effects';
import { QuizzService } from '../quizz-data-access/quizz.service';
import { QuizzFacade } from '../quizz-data-access/quizz.facade'
import { QuizzResolver } from './quizz/quizz.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: QuizzesComponent,
  },
  {
    path: 'play/:id',
    component: QuizzComponent,
    resolve: {
      quizz: QuizzResolver
    }
  },
  {
    path: 'result',
    component: QuizzResultComponent,
  }
];

@NgModule({
  declarations: [QuizzesComponent, QuizzComponent, QuizzResultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([QuizzEffects]),

    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  exports: [
    QuizzesComponent,
    HttpClientModule,
  ],
  providers: [QuizzService, QuizzFacade, QuizzResolver]
})
export class QuizzesModule { }