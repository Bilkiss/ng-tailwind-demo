import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailsComponent } from './components/property-list/property-details/property-details.component';
import { AuthComponent } from './components/auth/auth.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'car-list', component: CarListComponent },
  { path: 'car-details/:slug', component: CarDetailsComponent },
  { path: 'add-car', component: CarDetailsComponent, canActivate: [AuthGuard] },
  { path: 'property-list', component: PropertyListComponent },
  { path: 'property-details/:slug', component: PropertyDetailsComponent },
  { path: 'add-property', component: PropertyDetailsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
