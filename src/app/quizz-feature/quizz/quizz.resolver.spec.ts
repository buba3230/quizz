
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { QuizzResolver } from './quizz.resolver';

import { MappedQuizzQuestions } from '../../quizz-data-access/quizz.models';
import { QuizzFacade } from '../../quizz-data-access/quizz.facade';

const mappedQuizz: MappedQuizzQuestions | undefined = {
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

class MockQuizzFacade {
    quizzById$() {
        return of(mappedQuizz);
    };
}

describe('QuizzResolver', () => {
let resolver: QuizzResolver;
let route: ActivatedRoute;

beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [],
        declarations: [],
        providers: [
            QuizzResolver,
            {
                provide: QuizzFacade,
                useClass: MockQuizzFacade,
            },
            {
                provide: ActivatedRoute,
                useValue: {
                    snapshot: { params: { id: '1' } }
                }
              },
        ],
    })
});

beforeEach(() => {
    resolver = TestBed.inject(QuizzResolver);
    route = TestBed.inject(ActivatedRoute);
})

    it('should create QuizzResolver', () => {
        expect(resolver).toBeTruthy();
    })

    it('should resolve and return mappedQuizz', done => {

        const resolvedData$ = resolver.resolve(route.snapshot);
        resolvedData$.subscribe(data => {
            expect(data).toMatchObject(mappedQuizz);
            done();
        })
    })
});
