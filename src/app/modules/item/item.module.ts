import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ItemRoutingModule } from './item-routing.module';

import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';

@NgModule({
  declarations: [
    ItemListComponent,
    ItemDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ItemRoutingModule
  ]
})
export class ItemModule { }
