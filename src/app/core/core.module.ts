import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import {HERO_ENDPOINT, HeroService} from './services/hero.service';
import {ITEM_ENDPOINT, ItemService} from './services/item.service';
import { InMemoryDataService } from './services/in-memory-data.service';
import { Logger } from './services/logger.service';

@NgModule({
  imports: [
    CommonModule,

    HttpClientInMemoryWebApiModule.forRoot(
      // @ts-ignore
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  exports: [
    HttpClientInMemoryWebApiModule
  ],
  providers: [
    Logger,
    HeroService,
    ItemService,
    InMemoryDataService,
    { provide: HERO_ENDPOINT, useFactory: () => 'api/heroes' },
    { provide: ITEM_ENDPOINT, useFactory: () => 'api/items' }
  ]
})
export class CoreModule {

  public constructor(
    @Optional() @SkipSelf() coreModule: CoreModule
  ) {
    if (coreModule) {
      throw new TypeError('CoreModule is imported twice.');
    }
  }

}
