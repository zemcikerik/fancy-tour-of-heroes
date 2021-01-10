import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';

@Injectable()
export class FeatureService {

  public constructor(
    private readonly heroService: HeroService
  ) { }

  public getFeaturedHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes().pipe(
      map(heroes => heroes.slice(0, 5))
    );
  }

}
