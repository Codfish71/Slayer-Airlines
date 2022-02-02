import { Injectable } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private socialAuthService: SocialAuthService) {}

  checkLogIn() {
    if (localStorage.getItem('sessionToken') != null) {
      return true;
    }
    return false;
  }
}
