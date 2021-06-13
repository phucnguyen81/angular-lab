import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './toh/in-memory-data.service';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { API_SERVICE } from './api/api.service';
import { ApiDevService } from './api/api-dev.service';
import { ApiProdService } from './api/api-prod.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home.component';
import { NavService } from './nav.service';
import { environment as env } from 'environments/environment';

import { HighlightDirective } from './highlight/highlight.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SizerComponent } from './sizer/sizer.component';
import { UnlessDirective } from './unless/unless.directive';

import { DashboardComponent } from './toh/dashboard.component';
import { HeroDetailComponent } from './toh/hero-detail.component';
import { HeroResolver } from './toh/hero.resolver';
import { HeroSearchComponent } from './toh/hero-search.component';
import { HeroService } from './toh/hero.service';
import { HeroesComponent } from './toh/heroes.component';
import { TohComponent } from './toh/toh.component';

import { ReactiveFormModule } from './reactive-form/reactive-form.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { AnimeModule } from './anime/anime.module';


const imports: any[] = [
  BrowserAnimationsModule,
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  ReactiveFormModule,
  AppRoutingModule,
  HttpClientModule,
  env.production ? (
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: 300,
      passThruUnknownUrl: true
    })
  ) : [],
  DynamicFormModule,
  AnimeModule,
];

const apiServiceProvider = {
  provide: API_SERVICE, useClass: (
    env.production ? ApiProdService : ApiDevService
  )
};

@NgModule({
  imports,
  declarations: [
    AppComponent,
    HighlightDirective,
    HomeComponent,
    PageNotFoundComponent,
    SizerComponent,
    UnlessDirective,

    DashboardComponent,
    HeroSearchComponent,
    HeroesComponent,
    HeroDetailComponent,
    TohComponent,
  ],
  providers: [
    HeroResolver,
    HeroService,
    NavService,
    Title,
    apiServiceProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
