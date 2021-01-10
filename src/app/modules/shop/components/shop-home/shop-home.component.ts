import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../../core/models/hero.model';
import { HeroService } from '../../../../core/services/hero.service';

@Component({
  selector: 'toh-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.css']
})
export class ShopHomeComponent implements OnInit {

  public heroes: Hero[];

  public constructor(
    private readonly heroService: HeroService
  ) { }

  public ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
