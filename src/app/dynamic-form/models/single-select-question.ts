import { BaseFields, QuestionBase } from './question-base';

export class SingleSelectQuestion extends QuestionBase {

  options: {key: string, value: string}[];

  constructor(fields: BaseFields, options: {key: string, value: string}[]) {
    super(fields);
    this.options = options || [];
  }

}
