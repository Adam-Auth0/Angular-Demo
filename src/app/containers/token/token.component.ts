import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { atStandardClaims } from '../shared/standard-claims';
import { Time, TimerService } from '../../services/timer.service';


@Component({
    selector: 'app-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
    showtokenControl = new FormControl('');
    showvalidationControl = new FormControl('true');
    showjsonControl = new FormControl('');
    showclaimsControl = new FormControl('true');

    token: any;
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

    expTime$: Observable<Time>;

    constructor(private auth: AuthService, private timerService: TimerService) { }

    async ngOnInit(): Promise<any> {
        this.expTime$ = this.timerService.timer(new Date());

        const jwtHelper = new JwtHelperService();

        this.auth.accessToken$.subscribe(token => {
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
        });

        this.auth.userProfile$.subscribe(profile => {
            if (profile) {
                this.profile = profile;
                this.profileJson = JSON.stringify(this.profile, null, 2);
                return;
            }

            this.profile = null;
            this.profileJson = null;
        });

        if (this.token && this.profile) {
           return;
        }

        this.token = null;
        this.tokenClaims = null;
        this.tokenJson = null;
        this.profile = null;
        this.profileJson = null;
        this.expTime$ = null;
    }

    getClaimValue(claim) {
        console.log(claim);
        console.log(this.tokenClaims[claim]);
    }
}
