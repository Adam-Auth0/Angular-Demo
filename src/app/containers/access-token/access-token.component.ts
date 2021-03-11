import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth/auth.service';
import { Companies, Profiles } from './companies-profiles';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';
import { atStandardClaims } from '../shared/standard-claims';
import { Time, TimerService } from '../../services/timer.service';


@Component({
  selector: 'app-access-token',
  templateUrl: './access-token.component.html',
  styleUrls: ['./access-token.component.css']
})
export class AccessTokenComponent implements OnInit {
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
    tokenClaims: any;
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
    companies = Companies;
    profiles = Profiles;
    activeProfiles = [];

    expTime$: Observable<Time>;
 
    constructor(private auth: AuthService, private timerService: TimerService) { }

    async ngOnInit(): Promise<any> {
        this.expTime$ = this.timerService.timer(new Date());
    }

    initiateGetToken() {
        // the below is not require - need to get to the bottom of why.
        // const auth0Client$ = this.auth.createAuth0Client$({});

        const jwtHelper = new JwtHelperService();

        this.options = {
            audience: 'https://devapi.mansyscloud.net/api/',
            scope: this.selectedProfile + ':' + this.selectedCompany
        };


        // frameworkTweetsObservable.pipe(
        //     map(framework => getAgency(framework) ),
        //     exhaustMap(agency => agency.getRecruitsObservable() )
        // ).subscribe( recruit => console.log(recruit) );

        // Working on the below.

        // this.token2Observable.pipe(
        //    map(token => this.auth.getTokenSilently$(this.options))
        // ).subscribe(result => console.log(result));


        // End

        this.auth.getTokenSilently$(this.options).subscribe(token => {
            if (token) {
                this.token = token;
                this.jwtPart = this.token.split('.');
                this.isTokenExpired = jwtHelper.isTokenExpired(token);
                this.tokenClaims = jwtHelper.decodeToken(token);
                this.tokenClaimsKeys = Object.keys(this.tokenClaims);
                this.tokenJson = JSON.stringify(this.tokenClaims, null, 2);
                this.customClaims = this.tokenClaimsKeys.filter(item => atStandardClaims.indexOf(item) < 0);
                this.expTime$ = this.timerService.timer(this.tokenClaims.exp);
            }
        }, silentError => {
            if (silentError.error === 'consent_required') {
                this.auth.getTokenWithPopup$(this.options).subscribe(token => {
                    if (token) {
                        this.token = token;
                        this.jwtPart = this.token.split('.');
                        this.isTokenExpired = jwtHelper.isTokenExpired(token);
                        this.tokenClaims = jwtHelper.decodeToken(token);
                        this.tokenClaimsKeys = Object.keys(this.tokenClaims);
                        this.tokenJson = JSON.stringify(this.tokenClaims, null, 2);
                        this.customClaims = this.tokenClaimsKeys.filter(item => atStandardClaims.indexOf(item) < 0);
                        this.expTime$ = this.timerService.timer(this.tokenClaims.exp);
                    }
                }, popupError => {
                    console.log(popupError);
                });
            }
        });

        if (this.token) {
            // this.expTime$ = this.timerService.timer(new Date('June 22, 2020 20:00:00'));
            return;
        }


        this.token = null;
        this.tokenJson = null;
    }

    companyChange(companyName) {
        const selectedCompany = this.companies.find(item => item.name === companyName);
        this.activeProfiles = this.profiles.filter(item => item.compid === selectedCompany.id);
        this.selectedProfile = '';
    }
}
