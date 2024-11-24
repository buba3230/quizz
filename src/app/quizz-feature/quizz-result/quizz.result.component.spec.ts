
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Observable, of } from 'rxjs';

import { QuizzResultComponent } from './quizz-result.component'

import { IAnswers } from '../../quizz-data-access/quizz.models';
import { QuizzFacade } from '../../quizz-data-access/quizz.facade';

class MockQuizzFacade {
    result$: Observable<IAnswers | undefined> = of({
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
    })
}

describe('QuizzResultComponent', () => {
let fixture: ComponentFixture<QuizzResultComponent>;
let component: QuizzResultComponent;

beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [],
        declarations: [QuizzResultComponent],
        providers: [
            {
                provide: QuizzFacade,
                useClass: MockQuizzFacade,
            }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
});

beforeEach(() => {
    fixture = TestBed.createComponent<QuizzResultComponent>(QuizzResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
})

    it('should create QuizzResultComponent', () => {
        expect(component).toBeTruthy();
    })

    it('should set easiest question', () => {
        expect(component.easiest).toEqual(2);
    });

    it('should set hardest question', () => {
        expect(component.hardest).toEqual(1);
    });
});
