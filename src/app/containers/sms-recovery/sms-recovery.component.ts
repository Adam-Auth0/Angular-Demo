import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth/auth.service';
// import { ActivatedRoute } from '@angular/router';
// import * as config from '../../../../auth_config.json';
// import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
// import { map, exhaustMap } from 'rxjs/operators';
// import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { AuthError } from '../shared/errors';


@Component({
  selector: 'app-sms-recovery',
  templateUrl: './sms-recovery.component.html',
  styleUrls: ['./sms-recovery.component.css']
})
export class SmsRecoveryComponent implements OnInit {

    idToken: any;
    authError: AuthError

    constructor(private auth: AuthService) {}

    async ngOnInit(): Promise<any> {
        this.auth.idTokenClaims$.subscribe(idToken => {
            if (idToken) {
                this.idToken = idToken;
            }
        });
    }

    initiateSmsEnrol() {
        this.auth.login('/sms-recovery', this.authError, false, true);
    }
}
