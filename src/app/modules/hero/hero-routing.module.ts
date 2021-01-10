import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

const routes: Route[] = [
  { path: '', component: HeroListComponent },
  { path: ':id', component: HeroDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule { }
