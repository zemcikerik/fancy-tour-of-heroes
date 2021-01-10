import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';

const routes: Route[] = [
  { path: '', component: ItemListComponent },
  { path: ':id', component: ItemDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
