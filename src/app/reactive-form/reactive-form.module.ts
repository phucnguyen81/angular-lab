import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { environment as env } from 'environments/environment';

import { NameEditorComponent } from './name-editor.component';
import { ProfileEditorComponent } from './profile-editor.component';
import { ReactiveFormComponent } from './reactive-form.component';
import { ReactiveFormRoutingModule } from './reactive-form.routing.module';

const imports: any[] = [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
];

@NgModule({
  imports,
  declarations: [
    NameEditorComponent,
    ReactiveFormComponent,
    ProfileEditorComponent,
  ],
  providers: [],
  bootstrap: [ReactiveFormComponent]
})
export class ReactiveFormModule { }
