import { Action } from "@ngrx/store"
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing'; 
import { provideMockStore } from '@ngrx/store/testing'; 

import { Observable } from "rxjs"

import { hot, cold }from 'jest-marbles';

import { QuizzEffects } from './quizz.effects';
import { QuizzService } from './quizz.service';
import * as QuizzActions from './quizz.actions';

class MockQuizzService {
    getQuizzes$() {
        return cold('a|', {
            a: [
                {
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
                }
            ]
        })
    }
}

describe('QuizzEffects', () => {
    let actions: Observable<Action>;
    let effects: QuizzEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                QuizzEffects,
                {
                    provide: QuizzService,
                    useClass: MockQuizzService,
                },
                provideMockActions(() => actions),
                provideMockStore({
                    "initialState": {
                        quizzes: null,
                        error: null,
                        loaded: false,
                        result: null,
                    }
                })
            ]
        })

    effects = TestBed.inject(QuizzEffects);
    });

    it('should create effects', () => {
        expect(effects).toBeTruthy();
    });

    describe('loadQuizzes$', () => {
        beforeEach(() => {
            actions = hot('--a-|', {
                a: QuizzActions.getQuizzesAction()
            })
        })

    it('should trigger success action', () => {
        const ex = hot('--a-|', {
            a: QuizzActions.getQuizzesSuccessAction(
                {
                    quizzes: 
                    [
                        {
                            id: 1,
                            category: 'Test Category',
                            questions: [
                                {
                                    category: 'Test Category 1',
                                    difficulty: 'Easy',
                                    type: 'Multi',
                                    question: 'Test Question 1',
                                    correct_answer: 'A',
                                    incorrect_answers: ['B', 'C', 'D'],
                                    allAnswers: ['A', 'B', 'C', 'D']
                                }
                            ]
                        }
                    ]
                }
            ),
        });

        expect(effects.loadQuizzes$).toBeObservable(ex);
    });

    });
})