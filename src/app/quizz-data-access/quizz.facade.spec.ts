
import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';

import { of, Observable, switchMap } from 'rxjs';
import { take } from 'rxjs/operators';

import { FEATURE_NAME } from './quizz-actions-types';

import * as QuizzReducers from './quizz.reducers';
import { QuizzEffects } from './quizz.effects';
import { QuizzService } from './quizz.service';
import { QuizzFacade } from './quizz.facade';
import { MappedQuizzQuestions, IAnswers } from './quizz.models';

const QUIZZES = [{
    id: 1,
    category: 'Test Category',
    questions: [{
        category: 'Test Category 1',
        difficulty: 'Easy',
        type: 'Multi',
        question: 'Test Question 1',
        correct_answer: 'A',
        incorrect_answers: ['B', 'C', 'D'],
        allAnswers: ['A', 'B', 'C', 'D']
    }]
}];

class MockQuizzService {
    getQuizzes$(): Observable<MappedQuizzQuestions[]> {
        return of(QUIZZES);
    }
}

describe('QuizzFacade', () => {
    let facade: QuizzFacade;

    beforeEach(() => {
        @NgModule({
            imports: [
                StoreModule.forFeature(FEATURE_NAME, QuizzReducers.reducers),
                EffectsModule.forFeature([QuizzEffects])
            ],
            providers: [
                QuizzFacade,
                {
                    provide: QuizzService,
                    useClass: MockQuizzService,
                }
            ]
        })
        class QuizzTestModule {}

        @NgModule({
            imports: [
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                QuizzTestModule
            ],
            providers: [
                {
                    provide: QuizzService,
                    useClass: MockQuizzService,
                }
            ]
        })
        class MainTestModule {}

        TestBed.configureTestingModule({ imports: [MainTestModule]});
        TestBed.inject(Store);

        facade = TestBed.inject(QuizzFacade);
    });

    it('should be loaded', done => {
        const loaded$ = facade.getQuizzes$().pipe(
            switchMap(() => 
                facade.loaded$
            )
        );
        loaded$.pipe(take(1)).subscribe(value => {
            expect(value).toBeTruthy();
            done();
        })
    });

    it('should have quizzes', done => {
        const quizzes$ = facade.getQuizzes$().pipe(
            switchMap(() => 
                facade.quizzes$
            )
        );
        quizzes$.pipe(take(1)).subscribe(value => {
            expect(value).toEqual(QUIZZES);
            done();
        })
    });

    it('should not have error', done => {
        const error$ = facade.getQuizzes$().pipe(
            switchMap(() => 
                facade.error$
            )
        );
        error$.pipe(take(1)).subscribe(value => {
            expect(value).toBeNull();
            done();
        })
    });

    it('should return stream with quizzes', done => {
        const quizzes$ = facade.getQuizzes$();
        quizzes$.pipe(take(1)).subscribe(value => {
            expect(value).toEqual(QUIZZES);
            done();
        })
    });

    it('should set result', () => {
        const res: IAnswers = {
            time: '00:00:20:000',
            points: 100,
            answers: [{
                id: 1,
                question: 'Test question',
                selectedAnswer: 'A',
                correct_answer: 'A',
                time: '00:25:20:155',
                timeElapsed: 20000,
                status: true,
            }]
        };
        const spy = jest.spyOn(Store.prototype, 'dispatch');
        facade.setResult(res);
        expect(spy).toHaveBeenCalledWith({ result: res, type: "[QUIZZ] set result" });
    });

    it('should clear result', () => {
        const spy = jest.spyOn(Store.prototype, 'dispatch');
        facade.clearResult();
        expect(spy).toHaveBeenCalledWith({ type: "[QUIZZ] clear result" });
    });
});
