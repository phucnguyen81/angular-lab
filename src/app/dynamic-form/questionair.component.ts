import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, Validators
} from '@angular/forms';

import { QuestionBase } from './models/question-base';
import { OpenQuestion } from './models/open-question';
import { SingleSelectQuestion } from './models/single-select-question';

@Component({
  selector: 'my-questionair',
  templateUrl: './questionair.component.html',
  styleUrls: ['./questionair.component.css', './sample.css']
})
export class QuestionairComponent implements OnInit {

  @Input()
  questions: QuestionBase[] = [];

  questionControls: { question: QuestionBase, control: FormControl }[];

  form: FormGroup;

  payLoad = '';

  ngOnInit() {
    this.questionControls = this.questions.map(question => {
      const validators = [];
      if (question.required) {
        validators.push(Validators.required);
      }
      if (question.answerType === 'email') {
        validators.push(Validators.email);
      }
      return {
        question,
        control: new FormControl('', validators)
      };
    });

    const group: any = {};
    this.questionControls.forEach(control => {
      group[control.question.key] = control.control
    });
    this.form = new FormGroup(group);
  }

  isOpenQuestion(question: QuestionBase) {
    return question instanceof OpenQuestion;
  }

  isSingleSelectQuestion(question: QuestionBase) {
    return question instanceof SingleSelectQuestion;
  }

  // Only show errors after user has interacted with the control
  // TODO move this into validation folder
  shouldShowErrors(control?: AbstractControl): boolean {
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    }
    return this.shouldShowErrors(control);
  }

  onSubmit() {
    this.payLoad = this.form.getRawValue();
  }

}
