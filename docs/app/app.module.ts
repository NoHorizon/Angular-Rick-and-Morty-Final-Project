import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
// My components
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AboutprojectComponent } from './components/aboutproject/aboutproject.component';
import { HomeComponent } from './components/home/home.component';
import { AltersComponent } from './components/alters/alters.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardComponent,
    CarouselComponent,
    AboutprojectComponent,
    HomeComponent,
    AltersComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
