import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PresentationPageComponent } from './pages/presentation-page/presentation-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';

const routes: Routes = [
  { path: 'product/:id', component: SingleProductComponent},
  { path: 'artist/:id', component: PresentationPageComponent},
  { path: 'home', component: LandingPageComponent },
  { path: 'about', component: AboutComponent},
  { path: 'events', component: EventsPageComponent },
  { path: 'visitOurShop', component: ShopPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
