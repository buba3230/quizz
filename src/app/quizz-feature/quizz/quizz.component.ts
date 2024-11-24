import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MappedQuizzQuestions, IAnswers, IAnsweredQuestions } from '../../quizz-data-access/quizz.models';
import { QuizzFacade } from '../../quizz-data-access/quizz.facade';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.scss'
})
export class QuizzComponent implements OnInit {

  quizz: MappedQuizzQuestions;
  totalSize: number;

  showQuestions  = false;

  questionIndex = 0;
  answer: string | number;

  hours = '00';
  minutes = '00';
  seconds = '00';
  milliseconds = '000';
  timeElapsed: number;

  totalHours = '00';
  totalMinutes = '00';
  totalSeconds = '00';
  totalMilliseconds = '000';

  questionTimeUpdate: ReturnType<typeof setTimeout>;
  totalTimeUpdate: ReturnType<typeof setTimeout>;

  totalAnswer: IAnswers;
  answeredQuestions: IAnsweredQuestions[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private quizzFacade: QuizzFacade){}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data => {
        this.quizz = data['quizz'];
        this.totalSize = this.quizz.questions.length;
      })
    );
  }

  play(): void {
    this.showQuestions = !this.showQuestions;
    this.questionTimer();
    this.totalTimer();
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  makeChoise(): void {
    if (this.questionIndex<this.quizz.questions.length - 1) {
      this.pushAnswer(this.questionIndex);
      this.questionIndex++;
      clearInterval(this.questionTimeUpdate);
      this.questionTimer();
      this.answer = '';
    }
    else {
      clearInterval(this.totalTimeUpdate);
      clearInterval(this.questionTimeUpdate);
      this.pushAnswer(this.questionIndex);
      this.answer = '';
      const correctAnswers = this.answeredQuestions.filter(answer => answer.status).length;
      this.totalAnswer = {
        time: `${this.totalHours}:${this.totalMinutes}:${this.totalSeconds}:${this.totalMilliseconds}`,
        answers: this.answeredQuestions,
        points: +((100 * correctAnswers) / this.answeredQuestions.length).toFixed(2),
      };
      this.quizzFacade.setResult(this.totalAnswer);
      this.router.navigate(['result']);
    }
    

  }

  totalTimer(): void {
    const startTime = new Date();

        this.totalTimeUpdate = setInterval(() => {
            const timeElapsed = new Date().getTime() - startTime.getTime();    

            this.totalHours = this.getHours(timeElapsed);
            
            this.totalMinutes = this.getMinutes(timeElapsed);
            
            this.totalSeconds = this.getSeconds(timeElapsed);
            
            this.totalMilliseconds = this.getMiliseconds(timeElapsed)         
        }, 25);
  }

  questionTimer(): void {
    const startTime = new Date();

        this.questionTimeUpdate = setInterval(() => {
            const timeElapsed = new Date().getTime() - startTime.getTime();    

            this.hours = this.getHours(timeElapsed);
            
            this.minutes = this.getMinutes(timeElapsed);
            
            this.seconds = this.getSeconds(timeElapsed);
            
            this.milliseconds = this.getMiliseconds(timeElapsed)
            
            this.timeElapsed = timeElapsed;          
        }, 25);
  }

  private getHours(time: number): string {
    // calculate hours 
    const hours = Math.round(time / 1000 / 60 / 60);
    return this.prependZero(hours, 2);
  }

  private getMinutes(time: number): string {
    // calculate minutes
    let minutes = Math.round(time / 1000 / 60);
    if (minutes > 60) minutes %= 60;
    return this.prependZero(minutes, 2);
  }

  private getSeconds(time: number): string {
    // calculate seconds
    let seconds = Math.round(time / 1000);
    if (seconds > 60) seconds %= 60;
    return this.prependZero(seconds, 2);
  }

  private getMiliseconds(time: number): string {
    // calculate milliseconds 
    let milliseconds = time;
    if (milliseconds > 1000) milliseconds %= 1000;
    return this.prependZero(milliseconds, 3);
  }

  private prependZero(time: number, length: number) {
    const strTime = time.toString();
    return new Array(Math.max(length - strTime.length + 1, 0)).join("0") + time;
  }

  private pushAnswer(index: number): void {
    const question = this.quizz.questions[index];
      this.answeredQuestions.push({
        id: index + 1,
        question: question.question,
        selectedAnswer: this.answer,
        correct_answer: question.correct_answer,
        status: this.answer === question.correct_answer,
        time: `${this.hours}:${this.minutes}:${this.seconds}:${this.milliseconds}`,
        timeElapsed: this.timeElapsed
      });
  }
}
