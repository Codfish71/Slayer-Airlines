import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  socialUser!: SocialUser;
  @Output() isAuthorized = new EventEmitter<boolean>();
  isAdmin: boolean = false;
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.router.url == '/admin/login') {
      this.isAdmin = true;
    }
  }
  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userData) => {
        if (userData != null) {
          this.socialUser = userData;
          localStorage.setItem('sessionToken', this.socialUser.authToken);
          this.isAuthorized.emit(true);
          if (this.router.url == '/admin/login') {
            localStorage.setItem('userRole','admin');
            this.router.navigate(['admin/home']);
          } else {
            localStorage.setItem('userRole','staff');
            this.router.navigate(['staff/home']);
          }
        }
      });
      
  }
}
