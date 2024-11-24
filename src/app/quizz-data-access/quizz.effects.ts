import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { getQuizzesAction, getQuizzesSuccessAction, getQuizzesFailureAction } from './quizz.actions';
import { QuizzService } from './quizz.service';
import { MappedQuizzQuestions } from './quizz.models';

@Injectable()
export class QuizzEffects {
    loadQuizzes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getQuizzesAction),
            switchMap(() => {
                return this.service.getQuizzes$().pipe(
                    map((quizzes: MappedQuizzQuestions[]) => {
                        return getQuizzesSuccessAction({ quizzes })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(getQuizzesFailureAction(
                    { error: errorResponse.message }
                ))
            })
        )
    );

    

    constructor(private service: QuizzService, private actions$: Actions) { }
}