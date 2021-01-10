import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../../core/services/item.service';
import { Item } from '../../../../core/models/item.model';

@Component({
  selector: 'toh-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public items: Item[];

  public constructor(
    private readonly itemService: ItemService
  ) { }

  public ngOnInit(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }

}
