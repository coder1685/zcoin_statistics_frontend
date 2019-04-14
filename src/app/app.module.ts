import { NgModule }   from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { PageNotFoundComponent }  from './page-not-found.component';
import { HomeComponent }  from './home/home.component';
import { ChartComponent }  from './chart/chart.component';
import { AppRoutingModule }  from './app-routing.module';
import {AppLoadModule} from './app-load/app-load.module';
import {AgGridModule} from 'ag-grid-angular';
import {ChartGridComponent} from './chart/chart-grid.component';
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular-highcharts';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';

@NgModule({
  imports: [
        BrowserModule,
		FormsModule,
    AppLoadModule,
		AppRoutingModule,
    HttpClientModule,
    ChartModule,
    AgGridModule.withComponents([HomeComponent, ChartGridComponent])
  ],
  declarations: [
        AppComponent,
		PageNotFoundComponent,
		HomeComponent,
		ChartComponent,
    ChartGridComponent
  ],
  providers: [  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
