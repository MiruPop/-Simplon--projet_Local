import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PresentationPageComponent } from './pages/presentation-page/presentation-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { SingleProductComponent } from './pages/product-detail/single-product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { ArtistsPageComponent } from './pages/artists-page/artists-page.component';


const routes: Routes = [
  // protected routes :
  { path: 'membres', component: MembersPageComponent, canActivate: [OktaAuthGuard] },
  { path: 'mes-commandes', component: OrderHistoryComponent, canActivate: [OktaAuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [OktaAuthGuard] },

  //Okta callback & login
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  
  // general routes :
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'product/:id', component: SingleProductComponent },
  { path: 'artist/:id', component: PresentationPageComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'about', component: AboutComponent},
  { path: 'artists', component: ArtistsPageComponent},
  { path: 'events', component: EventsPageComponent },
  { path: 'visitOurShop', component: ShopPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})], // permet de revenir ?? position de d??part quand on revient sur la page pr??c??dente
  exports: [RouterModule]
})
export class AppRoutingModule {

}
