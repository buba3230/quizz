import { Action } from "@ngrx/store";

import * as QuizzActions from './quizz.actions';
import { QuizzActionsType } from './quizz-actions-types';
import { IAnswers, MappedQuizzQuestions } from './quizz.models';


describe('Quizz Actions', () => {

    it('should create getQuizzesAction action', () => {
        const action: Action = QuizzActions.getQuizzesAction();
        expect(action).toMatchObject({
            type: QuizzActionsType.GET_QUIZZES
        })
    });

    it('should create getQuizzesSuccessAction action', () => {
        const quizzes: MappedQuizzQuestions[] = [{
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
        const action: Action = QuizzActions.getQuizzesSuccessAction({ quizzes });
        expect(action).toMatchObject({
            type: QuizzActionsType.GET_QUIZZES_SUCCESS
        })
    });

    it('should create getQuizzesFailureAction action', () => {
        const action: Action = QuizzActions.getQuizzesFailureAction({ error: 'Something went wrong' });
        expect(action).toMatchObject({
            type: QuizzActionsType.GET_QUIZZES_FAILURE
        })
    });

    it('should create setResultAction action', () => {
        const result: IAnswers = {
            time: '00:00:05:000',
            points: 50,
            answers: [
                {
                    id: 1,
                    question: 'Test question 1',
                    selectedAnswer: 'A',
                    correct_answer: 'A',
                    time: '00:00:03:000',
                    timeElapsed: 3000,
                    status: true,
                },
                {
                    id: 2,
                    question: 'Test question 2',
                    selectedAnswer: 'A',
                    correct_answer: 'B',
                    time: '00:00:02:000',
                    timeElapsed: 2000,
                    status: false,
                },
            ]
        };
        const action: Action = QuizzActions.setResultAction({ result });
        expect(action).toMatchObject({
            type: QuizzActionsType.SET_RESULT
        })
    });

    it('should create clearResultAction action', () => {
        const action: Action = QuizzActions.clearResultAction();
        expect(action).toMatchObject({
            type: QuizzActionsType.CLEAR_RESULT
        })
    });
});
