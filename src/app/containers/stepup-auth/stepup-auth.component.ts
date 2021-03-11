import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth/auth.service';
// import { Companies, Profiles } from './companies-profiles';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';
import { atStandardClaims } from '../shared/standard-claims';
import { AuthError } from '../shared/errors';


@Component({
  selector: 'app-stepup-auth',
  templateUrl: './stepup-auth.component.html',
  styleUrls: ['./stepup-auth.component.css']
})
export class StepupAuthComponent implements OnInit {
    companyControl = new FormControl('');
    profileControl = new FormControl('');
    showtokenControl = new FormControl('');
    showvalidationControl = new FormControl('true');
    showjsonControl = new FormControl('');
    showclaimsControl = new FormControl('true');

    token2Observable: Observable<any>;
    token: any;
    options: any;
    jwtPart: [];
    tokenClaims: [];
    tokenClaimsKeys: any;
    tokenJson: any;
    isTokenExpired: boolean;
    profile: any;
    profileJson: string;
    customClaims: [];
    headElementsStandard = ['Claim', 'Name', 'Value', 'Additional Info'];
    headElementsCustom = ['Claim', 'Value'];
    selectedCompany: string;
    selectedProfile: string;
    // companies = Companies;
    // profiles = Profiles;
    activeProfiles = [];
    authError: AuthError;

    constructor(private auth: AuthService) { }

    async ngOnInit(): Promise<any> {}

    initiateStepUp() {
        // the below is not require - need to get to the bottom of why.
        // const auth0Client$ = this.auth.createAuth0Client$({});

        const jwtHelper = new JwtHelperService();

        this.options = {
            // audience: 'https://devapi.mansyscloud.net/api/',
            // scope: this.selectedProfile + ':' + this.selectedCompany
            // acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'
        };

        this.auth.login('/', this.authError, true, false);

        // End

        // this.auth.getTokenSilently$(this.options).subscribe(token => {
        //    if (token) {
        //        this.token = token;
        //        this.jwtPart = this.token.split('.');
        //        this.isTokenExpired = jwtHelper.isTokenExpired(token);
        //        this.tokenClaims = jwtHelper.decodeToken(token);
        //        this.tokenClaimsKeys = Object.keys(this.tokenClaims);
        //        this.tokenJson = JSON.stringify(this.tokenClaims, null, 2);
        //        this.customClaims = this.tokenClaimsKeys.filter(item => atStandardClaims.indexOf(item) < 0);

        //    }
        // }, silentError => {
        //    if (silentError.error === 'consent_required') {
        //        this.auth.getTokenWithPopup$(this.options).subscribe(token => {
        //            if (token) {
        //                this.token = token;
        //                this.jwtPart = this.token.split('.');
        //                this.isTokenExpired = jwtHelper.isTokenExpired(token);
        //                this.tokenClaims = jwtHelper.decodeToken(token);
        //                this.tokenClaimsKeys = Object.keys(this.tokenClaims);
        //                this.tokenJson = JSON.stringify(this.tokenClaims, null, 2);
        //                this.customClaims = this.tokenClaimsKeys.filter(item => atStandardClaims.indexOf(item) < 0);
        //            }
        //        }, popupError => {
        //            console.log(popupError);
        //        });
        //    }
        // });

        if (this.token) {
            return;
        }


        this.token = null;
        this.tokenJson = null;
    }

//    companyChange(companyName) {
//        const selectedCompany = this.companies.find(item => item.name === companyName);
//        this.activeProfiles = this.profiles.filter(item => item.compid === selectedCompany.id);
//        this.selectedProfile = '';
//    }
}
