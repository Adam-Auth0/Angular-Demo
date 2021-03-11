import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { routes } from 'src/app/app-routing.module';
import { ActivatedRoute, Params } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
// import { Router } from '@angular/router';
import { AuthError } from '../shared/errors';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  authError: AuthError;

  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute) {}
  // constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams.error) {
      this.auth.logout();
      this.authError = {
        type: this.activatedRoute.snapshot.queryParams.error,
        description: this.activatedRoute.snapshot.queryParams.error_description
      };
      this.auth.login('', this.authError);
    } else {
      this.auth.handleAuthCallback();
    }

    // const client = await this.authService.getAuth0Client();
    // const result = await client.handleRedirectCallback();

    // const targetRoute =
    //  result.appState && result.appState.target ? result.appState.target : '';

    // this.authService.isAuthenticated.next(await client.isAuthenticated());
    // this.authService.profile.next(await client.getUser());
    // this.authService.token.next(await client.getTokenSilently());

    // this.router.navigate([targetRoute]);
  }
}
