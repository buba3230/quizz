import { FEATURE_NAME } from "./quizz-actions-types";
import { IQuizzState, MappedQuizzQuestions } from "./quizz.models";
import * as QuizzSelectors from './quizz.selectors';

const QUIZZES = [
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
];

const RESULT = {
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

describe('QuizzSelectors', () => {
    let quizzState: IQuizzState;
    let state = {}

    beforeEach(() => {
        quizzState = {
            quizzes: QUIZZES,            
            error: 'Something went wrong',
            loaded: true,
            result: RESULT
        };
        state = {
            [FEATURE_NAME]: quizzState
        }
    });

    it('should return quizzes from state', () => {
        const result = QuizzSelectors.quizzessSelector(state);
        expect(result).toStrictEqual(QUIZZES);
    });

    it('should return quizzes by id from state', () => {
        const result = QuizzSelectors.getQuizzByIdSelector(state, 1);
        expect(result).toStrictEqual(QUIZZES[0]);
    });

    it('should return error from state', () => {
        const result = QuizzSelectors.errorSelector(state);
        expect(result).toEqual('Something went wrong');
    });

    it('should return loaded from state', () => {
        const result = QuizzSelectors.loadedSelector(state);
        expect(result).toBeTruthy();
    });

    it('should return result from state', () => {
        const result = QuizzSelectors.resultSelector(state);
        expect(result).toStrictEqual(RESULT);
    });
});
