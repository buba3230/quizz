import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';

import { QuizzFacade } from '../../quizz-data-access/quizz.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizz-result',
  templateUrl: './quizz-result.component.html',
  styleUrl: './quizz-result.component.scss'
})
export class QuizzResultComponent {

  easiest: number | undefined;
  hardest: number | undefined;

  correctAnswersCount: number;

  result$ = this.quizFacade.result$.pipe(
    tap(result => {
      if (!result) {
        this.router.navigate(['/']);
      } else {
        this.correctAnswersCount = result.answers.filter(a => a.status).length;
        const maxTime = Math.max(...result.answers.map(answer => answer.timeElapsed));
        this.hardest = result.answers.find(answer => answer.timeElapsed === maxTime)?.id;
        const minTime = Math.min(...result.answers.map(answer => answer.timeElapsed));
        this.easiest = result.answers.find(answer => answer.timeElapsed === minTime)?.id;
      }
    })
  );

  constructor(private quizFacade: QuizzFacade, private router: Router){}
}
