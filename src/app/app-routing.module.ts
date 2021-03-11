import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { PwdchgdComponent } from './containers/pwdchgd/pwdchgd.component';
import { CallbackComponent } from './containers/callback/callback.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { IdTokenComponent } from './containers/idtoken/idtoken.component';
import { TokenComponent } from './containers/token/token.component';
import { AuthGuard } from './auth/auth.guard';
import { AccessTokenComponent } from './containers/access-token/access-token.component';
import { StepupAuthComponent } from './containers/stepup-auth/stepup-auth.component';
import { SmsRecoveryComponent } from './containers/sms-recovery/sms-recovery.component';
import { ExternalApiComponent } from './containers/external-api/external-api.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'pwdchgd',
    component: PwdchgdComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'idtoken',
    component: IdTokenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'token',
    component: TokenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    children: [],
    canActivate: [AuthGuard]
  },
  {
    path: 'access-token',
    component: AccessTokenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stepup-auth',
    component: StepupAuthComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sms-recovery',
    component: SmsRecoveryComponent
  },
  {
    path: 'external-api',
    component: ExternalApiComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
