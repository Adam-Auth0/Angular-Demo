import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth/auth.service';
import { AccessTokenClaims } from './accesstokenclaims';

@Component({
    selector: 'app-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
    public show = false;
    public buttonName: any = 'Show';
    token: any;
    tokenClaims: AccessTokenClaims;
    tokenJson: any;
    profile: any;
    profileJson: string;
    headElements = ['Claim', 'Value'];

    constructor(private auth: AuthService) { }

    async ngOnInit(): Promise<any> {
        const jwtHelper = new JwtHelperService();

        this.auth.accessToken$.subscribe(token => {
            if (token) {
                this.token = token;
                this.tokenClaims = jwtHelper.decodeToken(token);
                this.tokenJson = JSON.stringify(this.tokenClaims, null, 2);
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

        // console.log(this.token);
        // console.log(this.profile);

        if (this.token && this.profile) {
           return;
        }


        this.token = null;
        this.tokenClaims = null;
        this.tokenJson = null;
        this.profile = null;
        this.profileJson = null;
    }

    toggle() {
        this.show = !this.show;

        // CHANGE THE NAME OF THE BUTTON.
        if (this.show) {
            this.buttonName = 'Hide JSON';
        } else {
            this.buttonName = 'Show JSON';
        }
    }
}
