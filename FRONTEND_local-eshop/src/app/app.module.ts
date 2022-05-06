import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// MDB Modules
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArtistBarComponent } from './components/artist-bar/artist-bar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AboutComponent } from './pages/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { PresentationPageComponent } from './pages/presentation-page/presentation-page.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { FactureMailComponent } from './facture-mail/facture-mail.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ArtistsService } from './services/artists.service';
import { ProductsService } from './services/products.service';


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
    ArtistListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
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
