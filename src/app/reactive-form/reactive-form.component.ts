import { Component } from '@angular/core';

export type EditorType = 'name' | 'profile';

@Component({
  selector: 'my-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {

  /**
   * The `state` of the component. In reactive form, the component explicitly
   * holds and updates the state, the template just presents the state. Data
   * flows from component to template, events flow from template to
   * component.
   */
  private editor: EditorType = 'name';

  get showNameEditor(): boolean { return this.editor === 'name'; }
  setNameEditor(): void { this.editor = 'name'; }

  get showProfileEditor(): boolean { return this.editor === 'profile'; }
  setProfileEditor(): void { this.editor = 'profile'; }

}
