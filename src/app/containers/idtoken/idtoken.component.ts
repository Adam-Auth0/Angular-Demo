import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { idtStandardClaims, idtMfaClaims } from '../shared/standard-claims';
import { Time, TimerService } from '../../services/timer.service';

@Component({
    selector: 'app-idtoken',
    templateUrl: './idtoken.component.html',
    styleUrls: ['./idtoken.component.css']
})
export class IdTokenComponent implements OnInit {
    showtokenControl = new FormControl('');
    showvalidationControl = new FormControl('true');
    showjsonControl = new FormControl('');
    showclaimsControl = new FormControl('true');

    idToken: any;
    jwtPart: [];
    idTokenClaims: any;
    idTokenClaimsKeys: any;
    idTokenJson: any;
    isIdTokenExpired: boolean;
    profile: any;
    profileJson: string;
    customClaims: [];
    headElementsStandard = ['Claim', 'Name', 'Value', 'Additional Info'];
    headElementsMfa = ['Claim', 'Name', 'Value'];
    headElementsCustom = ['Claim', 'Value'];

    expTime$: Observable<Time>;

    constructor(private auth: AuthService, private timerService: TimerService) { }

    async ngOnInit(): Promise<any> {
        this.expTime$ = this.timerService.timer(new Date());

        const jwtHelper = new JwtHelperService();

        this.auth.idTokenClaims$.subscribe(idToken => {
            if (idToken) {
                this.idToken = idToken;
                this.jwtPart = this.idToken.split('.');
                this.isIdTokenExpired = jwtHelper.isTokenExpired(idToken);
                this.idTokenClaims = jwtHelper.decodeToken(idToken);
                this.idTokenClaimsKeys = Object.keys(this.idTokenClaims);
                this.idTokenJson = JSON.stringify(this.idTokenClaims, null, 2);
                this.customClaims = this.idTokenClaimsKeys.filter(
                    item => (idtStandardClaims.indexOf(item) < 0 && idtMfaClaims.indexOf(item) < 0
                ));
                this.expTime$ = this.timerService.timer(this.idTokenClaims.exp);
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

        if (this.idToken && this.profile) {
            return;
        }

        this.idToken = null;
        this.idTokenClaims = null;
        this.idTokenJson = null;
        this.profile = null;
        this.profileJson = null;
    }

    getClaimValue(claim) {
        console.log(claim);
        console.log(this.idTokenClaims[claim]);
    }
}
