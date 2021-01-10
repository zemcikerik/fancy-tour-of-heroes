import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FeatureService } from './services/feature.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  providers: [
    FeatureService
  ]
})
export class HomeModule { }
