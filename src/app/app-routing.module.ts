import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { DashboardComponent } from './toh/dashboard.component';
import { HeroDetailComponent } from './toh/hero-detail.component';
import { HeroResolver } from './toh/hero.resolver';
import { HeroesComponent } from './toh/heroes.component';
import { TohComponent } from './toh/toh.component';

import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

import { DemoComponent } from './dynamic-form/demo.component';

import { OpenCloseComponent } from './anime/open-close.component';

const routes: Routes = [
  {
    path: 'toh', component: TohComponent,
    data: { title: 'Tour of Heroes' },
    children: [
      {
        path: 'dashboard', component: DashboardComponent,
        data: { title: 'Heroes Dashboard' }
      },
      {
        path: 'detail/:id', component: HeroDetailComponent,
        data: { title: 'Hero Detail' },
        resolve: { hero: HeroResolver }
      },
      {
        path: 'heroes', component: HeroesComponent,
        data: { title: 'Heroes' }
      }
    ]
  },
  {
    path: 'reactive-form', component: ReactiveFormComponent,
    data: { title: 'Reactive Form' },
  },
  // TODO make route to the module (lazy loaded?), not the component
  {
    path: 'dynamic-form', component: DemoComponent,
    data: { title: 'Dynamic Form' }
  },
  {
    path: 'animation', component: OpenCloseComponent,
    data: { title: 'Animation' }
  },
  {
    path: '', component: HomeComponent, pathMatch: 'full',
    data: { title: 'Home' }
  },
  {
    path: '**', component: PageNotFoundComponent,
    data: { title: 'Page Not Found' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
