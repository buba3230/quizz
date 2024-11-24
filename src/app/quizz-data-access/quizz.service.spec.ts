
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { MappedQuizzQuestions, IQuizzResponse } from './quizz.models';
import { QuizzService } from './quizz.service';

const mappedQuizz: MappedQuizzQuestions = {
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
};

class MockHttpClient {
    get(): Observable<IQuizzResponse> {
        return of({
            response_code: 5,
            results: [
                {
                    category: 'Test Category 1',
                    difficulty: 'Easy',
                    type: 'Multi',
                    question: 'Test Question 1',
                    correct_answer: 'A',
                    incorrect_answers: ['B', 'C', 'D'],
                    allAnswers: expect.any(Array), //coz it was shuffled
                },
                {
                    category: 'Test Category 1',
                    difficulty: 'Easy',
                    type: 'Multi',
                    question: 'Test Question 2',
                    correct_answer: 'A',
                    incorrect_answers: ['B', 'C', 'D'],
                    allAnswers: expect.any(Array), //coz it was shuffled
                }
            ]
        })
    }
}
describe('QuizzService', () => {
let service: QuizzService;

beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [],
        declarations: [],
        providers: [
            QuizzService,
            {
                provide: HttpClient,
                useClass: MockHttpClient,
            },
        ],
    })
});

beforeEach(() => {
    service = TestBed.inject(QuizzService);
})

    it('should create QuizzService', () => {
        expect(service).toBeTruthy();
    });

    it('should return mapped quizzes data', done => {
        const data$ = service.getQuizzes$();
        data$.subscribe(data => {
            expect(data).toEqual([
                {
                    category: "Test Category 1", 
                    id: 0, 
                    questions: [
                        {
                            allAnswers: expect.any(Array), //coz it was shuffled, 
                            category: "Test Category 1", 
                            correct_answer: "A", 
                            difficulty: "Easy", 
                            incorrect_answers: ["B", "C", "D"], 
                            question: "Test Question 1", 
                            type: "Multi"
                        }, 
                        {
                            allAnswers: expect.any(Array), //coz it was shuffled, 
                            category: "Test Category 1", 
                            correct_answer: "A", 
                            difficulty: "Easy", 
                            incorrect_answers: ["B", "C", "D"], 
                            question: "Test Question 2", 
                            type: "Multi"
                        }
                    ]
                }]);
            done();
        })
    });
});
