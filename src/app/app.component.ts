import { Component } from '@angular/core';
import {AppLoadService} from './app-load/app-load.service';
import * as jquery from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalSupply: string;
  constructor(appLoadService: AppLoadService) {
    //$('ag-paging-row-summary-panel').css({'color': 'white'});
    this.totalSupply = appLoadService.totalSupply.toLocaleString();
  }
}
