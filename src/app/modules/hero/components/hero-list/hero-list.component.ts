import { Component, OnInit } from '@angular/core';

import { Hero } from '../../../../core/models/hero.model';
import { HeroService } from '../../../../core/services/hero.service';

@Component({
  selector: 'toh-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  public heroes: Hero[];

  public constructor(
    private readonly heroService: HeroService
  ) { }

  public ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
