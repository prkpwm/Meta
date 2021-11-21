import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { contactComponent } from './pages/contact/contact.component';
import { aboutComponent } from './pages/about/about.component';
const routes: Routes = [
  { path: '',  component: DashboardComponent},
  { path: 'contact',  component: contactComponent},
  { path: 'about',  component: aboutComponent},
  { path: '**', component : NotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
