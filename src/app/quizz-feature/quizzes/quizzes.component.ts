import { AfterContentInit, Component, OnDestroy } from '@angular/core';

import { QuizzFacade } from '../../quizz-data-access/quizz.facade';

import { tap } from 'rxjs/operators';

import { IQuizzDataSource, MappedQuizzQuestions } from '../../quizz-data-access/quizz.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent implements AfterContentInit, OnDestroy {
  isSpinerVisible = true;

  haveError: boolean;

  quizzes$ = this.quizzFacade.getQuizzes$();
  error$ = this.quizzFacade.error$.pipe(
    tap(error => this.haveError = !!error)
  );

  displayedColumns: string[] = ['quizz', 'count', 'options'];
  dataSource: IQuizzDataSource[] = [];

  quizzSubscription: Subscription;

  quizzes: MappedQuizzQuestions[] | null;

  constructor(private quizzFacade: QuizzFacade, private router: Router ){

  }

  ngAfterContentInit() {
    this.quizzSubscription = this.quizzes$.subscribe(
      allitems => {
        if (allitems) {
          this.quizzes = allitems;
          this.dataSource = allitems.map(item => ({
            id: item.id,
            quizz: item.category,
            count: item.questions.length
          }));
          this.isSpinerVisible = false;
        }
        
      }
    );
  }

  ngOnDestroy(): void {
    if (this.quizzSubscription) {
      this.quizzSubscription.unsubscribe();
    }
  }

  play(id: number) {
    this.router.navigate(['play', id]);
  }

  random(): void{
    const randomId = Math.floor(Math.random() * 10);
    this.router.navigate(['play', randomId]);
  }


}
