import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../../core/models/hero.model';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'toh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public featuredHeroes: Hero[];

  public constructor(
    private readonly featureService: FeatureService
  ) { }

  public ngOnInit(): void {
    this.featureService.getFeaturedHeroes()
      .subscribe(heroes => this.featuredHeroes = heroes);
  }

}
