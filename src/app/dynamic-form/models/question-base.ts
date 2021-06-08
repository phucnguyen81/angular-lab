/**
 * Common fields on the original questions.
 */
export interface BaseFields {
  key?: string;
  label?: string;
  order?: number;
  required?: boolean;
  answerType?: string;
}

/**
 * Common fields on a question.
 */
export abstract class QuestionBase {

  key: string;
  label: string;
  order: number;
  required: boolean;
  answerType: string;

  constructor(fields: BaseFields) {
    this.key = fields.key || '';
    this.label = fields.label || '';
    this.order = fields.order || -1;
    this.required = !!fields.required;
    this.answerType = fields.answerType || '';
  }

}
