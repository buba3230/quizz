import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { QuizzFacade } from '../../quizz-data-access/quizz.facade';
import { MappedQuizzQuestions } from '../../quizz-data-access/quizz.models';

@Injectable()
export class QuizzResolver implements Resolve<Observable<MappedQuizzQuestions | undefined>> {

  quizz$: Observable<MappedQuizzQuestions | undefined>;

  constructor(
    private quizzFacade: QuizzFacade,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<MappedQuizzQuestions | undefined>{

    this.quizz$ = this.quizzFacade.quizzById$(+route.params['id']);

    return this.quizz$.pipe(
        tap(quizz => {
            if (!quizz) {
                this.router.navigateByUrl('/')
            }
        }),
    );
  }
}
