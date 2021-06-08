import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NameEditorComponent } from './name-editor.component';
import { ProfileEditorComponent } from './profile-editor.component';
import { ReactiveFormComponent } from './reactive-form.component';

const routes: Routes = [
  {
    path: 'name-editor', component: NameEditorComponent,
    data: { title: 'Name Editor' }
  },
  {
    path: 'profile-editor', component: ProfileEditorComponent,
    data: { title: 'Profile Editor' }
  },
  {
    path: '', component: ReactiveFormComponent,
    data: { title: 'Reactive Form' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveFormRoutingModule { }
