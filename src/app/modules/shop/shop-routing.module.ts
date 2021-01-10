import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';

import { ShopHomeComponent } from './components/shop-home/shop-home.component';
import { ShopItemsComponent } from './components/shop-items/shop-items.component';

const routes: Route[] = [
  { path: '', component: ShopHomeComponent },
  { path: ':id', component: ShopItemsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
