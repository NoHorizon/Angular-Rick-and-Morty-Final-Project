import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutprojectComponent } from './components/aboutproject/aboutproject.component';
import { HomeComponent } from './components/home/home.component';
import { AltersComponent } from './components/alters/alters.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutprojectComponent },
  { path: 'alters', component: AltersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
