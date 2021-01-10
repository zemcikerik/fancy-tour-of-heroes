import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../../../../core/models/hero.model';
import { Item } from '../../../../core/models/item.model';
import { HeroService } from '../../../../core/services/hero.service';
import { ItemService } from '../../../../core/services/item.service';

@Component({
  selector: 'toh-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.css']
})
export class ShopItemsComponent implements OnInit {

  public hero: Hero;
  public items: Item[];
  public columnsToDisplay: string[] = ['id', 'name', 'price', 'buy'];

  public constructor(
    private readonly heroService: HeroService,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);

    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }

  public canPurchase(item: Item): boolean {
    return item.isPurchasable && this.hero.money >= item.price;
  }

  public buyItem(item: Item): void {
    if (!this.canPurchase(item)) {
      return;
    }

    item.isPurchasable = false;
    this.hero.money -= item.price;
    this.hero.items.push(item);

    this.heroService.updateHero(this.hero).subscribe();
    this.itemService.updateItem(item).subscribe();
  }

}
