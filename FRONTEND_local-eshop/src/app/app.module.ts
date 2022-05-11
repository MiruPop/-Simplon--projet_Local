import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

// MDB Modules
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

import { ArtistsService } from './services/artists.service';
import { ProductsService } from './services/products.service';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArtistBarComponent } from './components/artist-bar/artist-bar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './pages/about/about.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { PresentationPageComponent } from './pages/presentation-page/presentation-page.component';
import { SingleProductComponent } from './pages/product-detail/single-product.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { FactureMailComponent } from './facture-mail/facture-mail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    FooterComponent,
    ArtistBarComponent,
    ProductCardComponent,
    AboutComponent,
    LandingPageComponent,
    EventsPageComponent,
    ShopPageComponent,
    ContactPageComponent,
    ModalComponent,
    PresentationPageComponent,
    SingleProductComponent,
    ShoppingCartComponent,
    FactureMailComponent,
    PaymentModalComponent,
    ProductListComponent,
    ArtistListComponent,
    CartStatusComponent,
    CheckoutComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdbCarouselModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbModalModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    ProductsService,
    ArtistsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
