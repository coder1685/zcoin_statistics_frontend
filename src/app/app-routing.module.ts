import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }  from './page-not-found.component';
import { HomeComponent }  from './home/home.component';
import { ChartComponent }  from './chart/chart.component';

const routes: Routes = [
    { path: 'richAddress', component: HomeComponent },
	{ path: 'chart/:id', component: ChartComponent },
	{ path: '', redirectTo: '/richAddress', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{ }
