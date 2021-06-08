import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { environment as env } from 'environments/environment';

import { DemoComponent } from './demo.component';
import { QuestionairComponent } from './questionair.component';

const imports: any[] = [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
];

@NgModule({
  imports,
  declarations: [
    DemoComponent,
    QuestionairComponent,
  ],
  bootstrap: [DemoComponent]
})
export class DynamicFormModule { }
