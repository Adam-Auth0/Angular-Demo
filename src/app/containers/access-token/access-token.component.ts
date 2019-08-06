import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth/auth.service';
import { Companies, Profiles } from './companies-profiles';

@Component({
  selector: 'app-access-token',
  templateUrl: './access-token.component.html',
  styleUrls: ['./access-token.component.css']
})
export class AccessTokenComponent implements OnInit {
    companyControl = new FormControl('');
    profileControl = new FormControl('');
    showjsonControl = new FormControl('');

    token2: any;
    // token2Claims: AccessTokenClaims;
    token2Json: any;
    headElements = ['Claim', 'Value'];
    jwtPart = [];

    selectedCompany: string;
    selectedProfile: string;
    companies = Companies;
    profiles = Profiles;
    activeProfiles = [];

    constructor(private auth: AuthService) { }

    async ngOnInit(): Promise<any> {}

    initiateGetToken() {
        // the below is not require - need to get to the bottom of why.
        // const auth0Client$ = this.auth.createAuth0Client$({});

        const jwtHelper = new JwtHelperService();

        this.auth.getTokenSilently$({
            audience: 'https://devapi.mansyscloud.net/api/',
            scope: this.selectedProfile + ':' + this.selectedCompany,
            // company: this.companyControl.value,
            // profile: this.profileControl.value
        }).subscribe(token2 => {
            if (token2) {
                this.token2 = token2;
                this.jwtPart = this.token2.split('.');
                // this.tokenClaims = jwtHelper.decodeToken(token);
                this.token2Json = JSON.stringify(jwtHelper.decodeToken(this.token2), null, 2);
            }
        }, silentError => {
            if (silentError.error === 'consent_required') {
                this.auth.getTokenWithPopup$({
                    audience: 'https://devapi.mansyscloud.net/api/',
                    scope: this.profileControl.value + ':' + this.companyControl.value
                }).subscribe(token2 => {
                    if (token2) {
                        this.token2 = token2;
                        // this.tokenClaims = jwtHelper.decodeToken(token);
                        this.token2Json = JSON.stringify(jwtHelper.decodeToken(this.token2), null, 2);
                    }
                }, popupError => {
                    console.log(popupError);
                });
            }
        });

        if (this.token2) {
            return;
        }


        this.token2 = null;
        this.token2Json = null;
    }

    companyChange(companyName) {
        const selectedCompany = this.companies.find(item => item.name === companyName);
        this.activeProfiles = this.profiles.filter(item => item.compid === selectedCompany.id);
        this.selectedProfile = '';
    }
}
