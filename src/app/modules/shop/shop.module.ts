import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopHomeComponent } from './components/shop-home/shop-home.component';
import { ShopItemsComponent } from './components/shop-items/shop-items.component';

@NgModule({
  declarations: [
    ShopHomeComponent,
    ShopItemsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
