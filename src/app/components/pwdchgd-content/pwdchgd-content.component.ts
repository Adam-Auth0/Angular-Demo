import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pwdchgd-content',
  templateUrl: './pwdchgd-content.component.html',
  styleUrls: ['./pwdchgd-content.component.css']
})
export class PwdchgdContentComponent implements OnInit {

  email: string;
  success: string;
  message: string;
  wellformed: boolean;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.success = this.route.snapshot.queryParamMap.get('success');
    this.message = this.route.snapshot.queryParamMap.get('message');
    if (this.email && this.success && this.message) {
      this.wellformed = true;
    }
  }
}
