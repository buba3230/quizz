import { IAnswers, IQuizzState } from "./quizz.models";

import * as QuizzActions from './quizz.actions';
import * as QuizzReducer from './quizz.reducers';
import { MappedQuizzQuestions } from './quizz.models';


describe('quizzReducer', () => {
    let state: IQuizzState;

    beforeEach(() => {
        state = {
            quizzes: null,
            error: null,
            loaded: false,
            result: null,
        }
    });

    describe('getQuizzesAction', () => {
        const action = QuizzActions.getQuizzesAction();
        const { loaded, error } = QuizzReducer.reducers(state, action);

        it('should not be loaded', () => {
            expect(loaded).toBeFalsy();
        });

        it('should not have error', () => {
            expect(error).toBeNull();
        });
    });

    describe('getQuizzesSuccessAction', () => {
        const quizzesFromEffects: MappedQuizzQuestions[] = [{
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
        const action = QuizzActions.getQuizzesSuccessAction({ quizzes: quizzesFromEffects });
        const { loaded, quizzes } = QuizzReducer.reducers(state, action);

        it('should be loaded', () => {
            expect(loaded).toBeTruthy();
        });

        it('should set quizzes', () => {
            expect(quizzes).toEqual(quizzesFromEffects);
        });
    });

    describe('getQuizzesFailureAction', () => {
        const action = QuizzActions.getQuizzesFailureAction({ error: 'Something went wrong'});
        const { loaded, error, quizzes } = QuizzReducer.reducers(state, action);

        it('should not be loaded', () => {
            expect(loaded).toBeFalsy();
        });

        it('should have error', () => {
            expect(error).toEqual('Something went wrong');
        });

        it('should not have quizzes', () => {
            expect(quizzes).toBeNull();
        });
    });

    describe('setResultAction', () => {
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
        const action = QuizzActions.setResultAction({ result : res });
        const { result } = QuizzReducer.reducers(state, action);

        it('should set result', () => {
            expect(result).toMatchObject(res);
        });
    });

    describe('clearResultAction', () => {
        const action = QuizzActions.clearResultAction();
        const { result } = QuizzReducer.reducers(state, action);

        it('should not have result result', () => {
            expect(result).toBeNull();
        });
    });
});
