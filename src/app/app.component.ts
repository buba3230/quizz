import { Component, OnInit } from '@angular/core';

import { QuizzService } from './quizz-data-access/quizz.service';

import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [QuizzService],
})
export class AppComponent {}
