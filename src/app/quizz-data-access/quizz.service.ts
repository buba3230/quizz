import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { IQuizzResponseResult, IQuizzResponse, IGroupedQuizz, MappedQuizzQuestions } from './quizz.models';

const SHUFFLE = () => Math.random() - 0.5;

@Injectable({ providedIn: 'root'})
export class QuizzService {
    url = 'https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple';

    constructor(private http: HttpClient) {}

    getQuizzes$(): Observable<MappedQuizzQuestions[]> {
        return this.http.get<IQuizzResponse>(`${this.url}`).pipe(
            map(response => {
                // Group questions by category
                const grouped = response.results.reduce(
                    (group: IGroupedQuizz, item: IQuizzResponseResult) => {
                      if (group[item.category]) {
                        group[item.category].push(item);
                      } else {
                        group[item.category] = [item];
                      }
                      return group;
                    }, {}
                );
console.log(grouped);
                //1. Get grouped questions
                return Object.values(grouped)
                    .sort((a, b) => b.length - a.length)    //2. Sort it DESC to get lower amount of questions at the bottom
                    .slice(0, 10)                           //3. Get only 10 groups
                    .sort(SHUFFLE)        //4. Shuffle groups
                    .map((quizz, index) => {
                            return ({
                                id: index,
                                category: encode(quizz[0].category),
                                questions: quizz.map(q => ({ 
                                  ...q, 
                                  question: encode(q.question),
                                  allAnswers: [ q.correct_answer, ...q.incorrect_answers ].sort(SHUFFLE)
                                }))
                            } as MappedQuizzQuestions)      //5. Map to usefull structure
                    });       
            }
            )       
        )
    }
}

function encode(str: string): string {
  return str.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&#039;/g, "'");
}
