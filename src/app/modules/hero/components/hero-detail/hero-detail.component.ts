import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../../../../core/models/hero.model';
import { HeroService } from '../../../../core/services/hero.service';

@Component({
  selector: 'toh-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  public hero: Hero;
  public columnsToDisplay: string[] = ['id', 'name', 'price'];

  public constructor(
    private readonly heroService: HeroService,
    private readonly route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

}
