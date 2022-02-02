import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthorized: boolean = false;
  constructor(private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {

  }
  ngDoCheck() {
    if (localStorage.getItem('sessionToken') != null) {
      this.isAuthorized = true
    }

  }
  homeButton() {
    if (localStorage.getItem('userRole') == 'admin') {
      this.router.navigate(['/admin/home']);
    }
    else {
      this.router.navigate(['/staff/home'])
    }
  }
  logOut(): void {
    localStorage.removeItem('sessionToken');
    this.socialAuthService.signOut();
    this.router.navigate(['/admin/login']);
  }


}
