import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { OpenCloseComponent } from './open-close.component';

const imports: any[] = [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
];

@NgModule({
  imports,
  declarations: [
    OpenCloseComponent
  ],
  providers: [],
  bootstrap: [
    OpenCloseComponent
  ]
})
export class AnimeModule { }
