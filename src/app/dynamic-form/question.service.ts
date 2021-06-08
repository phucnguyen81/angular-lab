import { Injectable } from '@angular/core';

import { of } from 'rxjs';

import { BaseFields, QuestionBase } from './models/question-base';
import { OpenQuestion } from './models/open-question';
import { SingleSelectQuestion } from './models/single-select-question';

@Injectable()
export class QuestionService {

  private readonly questions = [
    {
      key: 'brave',
      type: 'singleSelect',
      order: 3,
      label: 'Bravery Rating',
      options: [
        {key: 'solid',  value: 'Solid'},
        {key: 'great',  value: 'Great'},
        {key: 'good',   value: 'Good'},
        {key: 'unproven', value: 'Unproven'}
      ],
    },
    {
      key: 'firstName',
      type: 'open',
      order: 1,
      label: 'First name',
      required: true,
    },
    {
      key: 'emailAddress',
      type: 'open',
      order: 2,
      label: 'Email',
      answerType: 'email',
    },
  ];

  // TODO: get from a remote source of question metadata
  getQuestions() {
    const questions: QuestionBase[] = this.questions.map(question => {
      const fields: BaseFields = {
        key: question.key,
        label: question.label,
        required: question.required,
        order: question.order,
        answerType: question.answerType,
      };
      if (question.type === 'open') {
        return new OpenQuestion(fields);
      } else if (question.type === 'singleSelect') {
        return new SingleSelectQuestion(fields, question.options);
      } else {
        return null;
      }
    }).filter(
      question => !!question
    ).sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    );

    return of(questions);
  }

}
