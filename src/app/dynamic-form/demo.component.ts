import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable } from 'rxjs';
import * as rx from 'rxjs/operators';

import { QuestionService } from './question.service';
import { QuestionBase } from './models/question-base';

@Component({
  selector: 'my-dynamic-form-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css', './sample.css'],
  providers:  [QuestionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {

  readonly questions$: Observable<QuestionBase[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions().pipe(
      rx.shareReplay(1)
    );
  }

}
