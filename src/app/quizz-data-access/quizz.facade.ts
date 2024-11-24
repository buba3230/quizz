import { Injectable } from '@angular/core';

import { Store, Action } from '@ngrx/store';

import * as selectors from './quizz.selectors';
import * as QuizzActions from './quizz.actions';
import { Observable, switchMap } from 'rxjs';
import { IAnswers, MappedQuizzQuestions } from './quizz.models';

@Injectable()
export class QuizzFacade {
    readonly quizzes$ = this.store.select(selectors.quizzessSelector);
    readonly quizzById$ = (id: number) => this.store.select(selectors.getQuizzByIdSelector, id);
    readonly error$ = this.store.select(selectors.errorSelector);
    readonly loaded$ = this.store.select(selectors.loadedSelector);
    readonly result$ = this.store.select(selectors.resultSelector);

    constructor(private store: Store) {}

    public getQuizzes$(): Observable<MappedQuizzQuestions[] | null> {
        return this.loaded$.pipe(
            switchMap(loaded => {
                if (loaded) {
                    return this.quizzes$;
                }
                this.loadQuizzes();
                return this.quizzes$;
            })
        )
    }

    public setResult(result: IAnswers): void {
        this.dispatch(QuizzActions.setResultAction({ result }));
    }

    public clearResult(): void {
        this.dispatch(QuizzActions.clearResultAction());
    }

    private loadQuizzes(): void {
        this.dispatch(QuizzActions.getQuizzesAction());
    }

    private dispatch(action: Action): void {
        this.store.dispatch(action)
    }
}
