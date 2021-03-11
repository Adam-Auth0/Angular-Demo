import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatSlideToggleModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightModule } from 'ngx-highlightjs';
import { json } from 'highlight.js/lib/languages/json';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { PwdchgdComponent } from './containers/pwdchgd/pwdchgd.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { PwdchgdContentComponent } from './components/pwdchgd-content/pwdchgd-content.component';
import { CallbackComponent } from './containers/callback/callback.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { IdTokenComponent } from './containers/idtoken/idtoken.component';
import { TokenComponent } from './containers/token/token.component';
import { AccessTokenComponent } from './containers/access-token/access-token.component';
import { StepupAuthComponent } from './containers/stepup-auth/stepup-auth.component';
import { SmsRecoveryComponent } from './containers/sms-recovery/sms-recovery.component';
import { TimerService } from './services/timer.service';
import { ExternalApiComponent } from './containers/external-api/external-api.component';

export function hljsLanguages() {
    return [{ name: 'json', func: json }];
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PwdchgdComponent,
    NavBarComponent,
    HeroComponent,
    FooterComponent,
    HomeContentComponent,
    PwdchgdContentComponent,
    CallbackComponent,
    LoadingComponent,
    ProfileComponent,
    IdTokenComponent,
    TokenComponent,
    AccessTokenComponent,
    StepupAuthComponent,
    SmsRecoveryComponent,
    ExternalApiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    FontAwesomeModule
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
