import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesModule } from './features/features.module';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from 'angularx-social-login';
import { AdminModule } from './features/admin/admin.module';
import { StaffModule } from './features/staff/staff.module';
import { FormsModule,ReactiveFormsModule,NgModel } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import {
  LocationStrategy,
  HashLocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { InterceptorService } from './core/services/interceptor.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '121812074548-517nlhfupu509udu2413ensnaodt046b.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
   },
   {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
   }
  ],
  bootstrap: [AppComponent],
  exports: [],
  
})
export class AppModule {}
