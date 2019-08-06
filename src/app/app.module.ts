import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule, MatSelectModule, MatButtonModule, MatSlideToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightModule } from 'ngx-highlightjs';
import { json } from 'highlight.js/lib/languages/json';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { CallbackComponent } from './containers/callback/callback.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { TokenComponent } from './containers/token/token.component';
import { AccessTokenComponent } from './containers/access-token/access-token.component';
// import { ExternalApiComponent } from './containers/external-api/external-api.component';

export function hljsLanguages() {
    return [{ name: 'json', func: json }];
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    HeroComponent,
    FooterComponent,
    HomeContentComponent,
    CallbackComponent,
    LoadingComponent,
    ProfileComponent,
    TokenComponent,
    AccessTokenComponent,
    // ExternalApiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
