
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { QuizzComponent } from './quizz.component'

import { QuizzFacade } from '../../quizz-data-access/quizz.facade';

class MockQuizzFacade {
    setResult = jest.fn();
}

@NgModule()
export class FixNavigationTriggeredOutsideAngularZoneNgModule {
  constructor(_router: Router) {
  }
}

class MockActivatedRoute {
    queryParams = new Observable( observer => {
      const urlParams = {
        id: '1'
      }
      
      observer.next(urlParams);
      observer.complete();
    });
    data = of({
        quizz: {
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
    });
  }

describe('QuizzComponent', () => {
let fixture: ComponentFixture<QuizzComponent>;
let component: QuizzComponent;

beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [FixNavigationTriggeredOutsideAngularZoneNgModule],
        declarations: [QuizzComponent],
        providers: [
            Router,
            {
                provide: QuizzFacade,
                useClass: MockQuizzFacade,
            },
            {
                provide: ActivatedRoute,
                useClass: MockActivatedRoute,
            }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
});

beforeEach(() => {
    fixture = TestBed.createComponent<QuizzComponent>(QuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
})

    it('should create QuizzComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should set question time', () => {
        jest.useFakeTimers();
        component.questionTimer();
        setTimeout(() => {
            component.makeChoise();
            expect(component.hours).toEqual('00');
            expect(component.minutes).toEqual('00');
            expect(component.seconds).toEqual('01');
            expect(component.milliseconds).toEqual('400');
        }, 1400);
        jest.runAllTimers();
    });

    it('should set total time', () => {
        jest.useFakeTimers();
        component.totalTimer();
        setTimeout(() => {
            component.makeChoise();
            expect(component.totalHours).toEqual('00');
            expect(component.totalMinutes).toEqual('00');
            expect(component.totalSeconds).toEqual('03');
            expect(component.totalMilliseconds).toEqual('200');
        }, 3200);
        jest.runAllTimers();
    });

    it('should start timers and show question if play clicked', () => {
        const questionTimerSpy = jest.spyOn(component, 'questionTimer');
        const totalTimerSpy = jest.spyOn(component, 'totalTimer');

        component.play();
        expect(component.showQuestions).toBeTruthy();
        expect(questionTimerSpy).toHaveBeenCalled();
        expect(totalTimerSpy).toHaveBeenCalled();
        component.makeChoise();
    });

    it('should navigate on main rout if cancel', () => {
        const mainSpy = jest.spyOn(Router.prototype, 'navigate');

        component.cancel();
        
        expect(mainSpy).toHaveBeenCalledWith(['/']);
    })
});
