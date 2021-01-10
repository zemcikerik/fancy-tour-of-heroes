import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../../../core/services/item.service';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../../../core/models/item.model';

@Component({
  selector: 'toh-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  public item: Item;

  public constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');

    this.itemService.getItem(id)
      .subscribe(item => this.item = item);
  }

}
