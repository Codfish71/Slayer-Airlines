import { NgModule } from '@angular/core';
import { PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin-routing.module').then(
        (m) => m.AdminRoutingModule
      ),
      
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./features/staff/staff-routing.module').then(
        (m) => m.StaffRoutingModule
      ),
  },
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes,{ preloadingStrategy: QuicklinkStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
