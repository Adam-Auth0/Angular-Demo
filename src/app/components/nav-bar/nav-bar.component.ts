import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
// import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { faUser, faPortrait, faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  // isAuthenticated = false;
  isCollapsed = true;
  profile: any;
  token: any;
  faUser = faUser;
  faPortrait = faPortrait;
  faPowerOff = faPowerOff;

  // private auth0Client: Auth0Client;

  constructor(public auth: AuthService) {}

  async ngOnInit() {
    this.auth.localAuthSetup();

    // this.auth0Client = await this.authService.getAuth0Client();

    // this.authService.isAuthenticated.subscribe(value => {
    //  this.isAuthenticated = value;
    // });

    this.auth.userProfile$.subscribe(profile => {
       this.profile = profile;
    });

    // this.authService.token.subscribe(token => {
    //  this.token = token;
    // });
}

  // async login() {
  //   await this.auth0Client.loginWithRedirect({
  //    redirect_uri: `${window.location.origin}/callback`
  //  });
  //}

  //logout() {
  //  this.auth0Client.logout({
  //    client_id: this.authService.config.clientId,
  //    returnTo: window.location.origin
  //  });
  //}
}
