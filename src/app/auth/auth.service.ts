import { Injectable } from '@angular/core';
import createAuth0Client, { RedirectLoginResult } from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { config } from '@fortawesome/fontawesome-svg-core';
import * as config from '../../../auth_config.json';
import { TokenList } from '../containers/shared/tokenlist';
import { AuthError } from '../containers/shared/errors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Create an observable of Auth0 instance of client
  auth0Client$: Observable<Auth0Client>;

  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$: Observable<boolean>;
  handleRedirectCallback$: Observable<RedirectLoginResult>;

  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  // getTokenSilently$: Observable<any>;

  // Create subject and public observable of id token claims
  private idTokenClaimsSubject$ = new BehaviorSubject<string>(null);
  idTokenClaims$ = this.idTokenClaimsSubject$.asObservable();

  // Create subject and public observable of access token
  private accessTokenSubject$ = new BehaviorSubject<string>(null);
  accessToken$ = this.accessTokenSubject$.asObservable();

  // Define a variable to hold access tokens
  private accessTokensAllSubject$ = new BehaviorSubject<TokenList[]>([{id: 1, token: 'test'}]);
  accessTokensAll$ = this.accessTokensAllSubject$.asObservable();

  constructor(private router: Router) {

    // Comment out the below and uncomment the following if not using organisations

    // this.auth0Client$ = this.createAuth0Client$({
    //  domain: config.domain,
    //  client_id: config.clientId,
    //  audience: config.audience,
    //  redirect_uri: `${window.location.origin}/callback`,
    //  organization: 'org_wWCO6nvUvn13J3m0'
    // });

    this.auth0Client$ = this.createAuth0Client$({
      domain: config.domain,
      client_id: config.clientId,
      audience: config.audience,
      scope: config.scope,
      redirect_uri: `${window.location.origin}/callback`
    });


    this.isAuthenticated$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) => from(client.isAuthenticated()))
    );

    this.handleRedirectCallback$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
    );

    // this.getTokenSilently$(options?) = this.auth0Client$.pipe(
    //    concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
    // );

}

  createAuth0Client$(options): Observable < Auth0Client > {
    // Create an observable of Auth0 instance of the client
    return (from(createAuth0Client(options)) as Observable<Auth0Client>).pipe(
        shareReplay(1), // Every subscription receives the same shared value
        catchError(err => throwError(err))
    );
  }

  // getUser$() is a method because options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options ? ): Observable < any > {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options)))
    );
  }

  // getIdTokenClaims$() is a method because options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getidtokenclaims
  getIdTokenClaims$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getIdTokenClaims(options)))
    );
  }

  // getTokenSilently$() is a method because options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#gettokensilently
  getTokenSilently$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
    );
  }

  // getTokenWithPopup$() is a method because options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#gettokensilently
  getTokenWithPopup$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenWithPopup(options)))
    );
  }

//
//
//  addTokenToTokenList$(token: TokenList) {
//    this.accessTokensAllSubject$.next(this.accessTokensAll$.value.push(token));
//  }
//
//
//

  localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams

    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, return stream that emits user object, id token claims and token
          return combineLatest([
              this.getUser$(),
              this.getIdTokenClaims$(),
              this.getTokenSilently$()
          ]);
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    const checkAuthSub = checkAuth$.subscribe((response: any[] | boolean) => {
      // If authenticated, response will be user object
      // If not authenticated, response will be 'false'
      // Set subjects appropriately
      if (response) {
        const user = response[0];
        const idtoken = response[1].__raw;
        const token = response[2];
        this.userProfileSubject$.next(user);
        this.idTokenClaimsSubject$.next(idtoken);
        this.accessTokenSubject$.next(token);
        // this.addTokenToTokenList$(token);
        // console.log('ACCESS TOKEN1: ' + JSON.stringify(this.accessToken$));
        // console.log('ACCESS TOKEN2: ' + JSON.stringify(this.accessTokenSubject$));
        // console.log('AT LIST: ' + this.accessTokensAll$);

      }
      this.loggedIn = !!response;
      // Clean up subscription
      checkAuthSub.unsubscribe();
    });
  }

  login(redirectPath: string = '/', authError: AuthError, stepupAuthN: boolean = false, passwordless: boolean = false) {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      console.log('StepUp AuthN: ' + stepupAuthN);
      console.log('Enrol SMS password recovery: ' + passwordless);
      if (stepupAuthN === true) {
        client.loginWithRedirect({
          redirect_uri: `${window.location.origin}/callback`,
          appState: { target: redirectPath },
          acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor',
          trantactionRef: '15de76e1ab43',
          trantactionValue: '£1000.00',
          
        });
      } else if (passwordless === true) {
        client.loginWithRedirect({
          redirect_uri: `${window.location.origin}/callback`,
          enrolSmsReset: true
        });

      } else if (authError) {
        client.loginWithRedirect({
          redirect_uri: `${window.location.origin}/callback`,
          appState: { target: redirectPath },
          authErrorType: authError.type,
          authErrorDescription: authError.description
        });
      } else {
        client.loginWithRedirect({
          redirect_uri: `${window.location.origin}/callback`,
          appState: { target: redirectPath },
          testValue: 'Hello!'
        });
      }
    });
  }

  handleAuthCallback() {
    // Only the callback component should call this method
    // Call when app reloads after user logs in with Auth0
    let targetRoute: string; // Path to redirect to after login processsed
    // Ensure Auth0 client instance exists
    const authComplete$ = this.auth0Client$.pipe(
      // Have client, now call method to handle auth callback redirect
      concatMap(() => this.handleRedirectCallback$),
      tap(cbRes => {
        // Get and set target redirect route from callback results
        targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
      }),
      concatMap(() => {
        // Redirect callback complete; create stream
        // returning user data and authentication status
        return combineLatest([
          this.getUser$(),
          this.getIdTokenClaims$(),
          this.getTokenSilently$(),
          this.isAuthenticated$
        ]);
      })
    );
    // Subscribe to authentication completion observable
    // Response will be an array of user and login status
    authComplete$.subscribe(([user, idtokenclaims, token, loggedIn]) => {
      // Update subjects and loggedIn property
      this.userProfileSubject$.next(user);
      this.idTokenClaimsSubject$.next(idtokenclaims.__raw);
      this.accessTokenSubject$.next(token);
      this.loggedIn = loggedIn;
      // Redirect to target route after callback processing
      console.log('Target Route: ' + JSON.stringify(targetRoute));
      this.router.navigate([targetRoute]);
    });
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: config.clientId,
        returnTo: `${window.location.origin}`
      });
    });
  }

}
