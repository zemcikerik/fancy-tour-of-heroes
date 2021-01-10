import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'heroes', loadChildren: () => import('./modules/hero/hero.module').then(m => m.HeroModule) },
  { path: 'items', loadChildren: () => import('./modules/item/item.module').then(m => m.ItemModule) },
  { path: 'shop', loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
