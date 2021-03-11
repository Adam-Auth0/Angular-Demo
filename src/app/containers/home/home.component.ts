import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AuthError } from '../shared/errors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string;
  success: string;
  message: string;
  authError: AuthError

  constructor(public auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.success = this.route.snapshot.queryParamMap.get('success');
    this.message = this.route.snapshot.queryParamMap.get('message');

    if (this.email && this.success && this.message) {
      this.auth.login('', this.authError);
    }



  }
}
