import { Component, OnInit } from '@angular/core';
import {ColDef, GridOptions} from 'ag-grid/main';
import {AppLoadService} from '../app-load/app-load.service';
import {RichAddress} from '../app-load/richAddress';

import {ChartGridComponent} from '../chart/chart-grid.component';
import * as jquery from 'jquery';


export const CLASS = 'color: white;';

@Component({
    selector: 'home-app',
    templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: RichAddress[] = [];

  appRichAddressList: Array<RichAddress> = [];


  constructor(private appLoadService: AppLoadService) {
    $('.ag-paging-row-summary-panel').css({'color': 'white'});
    this.gridOptions = <GridOptions>{};
    this.appRichAddressList = this.appLoadService.appRrichAddress;
  }

  ngOnInit(): void {
    this.appRichAddressList = this.appLoadService.appRrichAddress;
    this.initializeGrid();
    this.populateGridData();
  }

  initializeGrid() {
    this.gridOptions = {
      rowData: this.rowData,
      pagination: true,
      paginationPageSize:15,
      rowStyle: {background: 'black'},
      columnDefs: HomeComponent.buildColumnDefinitions()
    };
  }

  private static buildColumnDefinitions(): ColDef[] {
    return [
      {headerName: 'Rank', minWidth: 10, maxWidth: 40, field: 'rank', cellStyle: HomeComponent.getRankStyle},
      {headerName: 'Address', minWidth: 300, maxWidth: 500, field: 'address', cellStyle: HomeComponent.getAddressBalanceStyle},
      {headerName: 'Balance', minWidth: 10, maxWidth: 80, field: 'balance', cellStyle: HomeComponent.getAddressBalanceStyle},
      {headerName: 'Supply', minWidth: 10, maxWidth: 80, field: 'supply', cellStyle: HomeComponent.getAddressBalanceStyle},
      {headerName: '10 Minutes', minWidth: 50, maxWidth: 100, field: 'balanceInTenMinutes', cellStyle: HomeComponent.getStyle},
      {headerName: '1 Hour', minWidth: 50, maxWidth: 100, field: 'balanceInOneHour', cellStyle: HomeComponent.getStyle},
      {headerName: '1 Day', minWidth: 50, maxWidth: 100, field: 'balanceInOneDay', cellStyle: HomeComponent.getStyle},
      {headerName: '1 Week', minWidth: 50, maxWidth: 100, field: 'balanceInOneWeek', cellStyle: HomeComponent.getStyle},
      {headerName: '1 Month', minWidth: 50, maxWidth: 150, field: 'balanceInOneMonth', cellStyle: HomeComponent.getStyle},
      {headerName: '', maxWidth: 40, cellRendererFramework: ChartGridComponent, field: 'address'}
    ]
  }

  static getStyle(params) {
    let val: string = params.value;
    if(val.toString() === '0%') {
      return {height: 15, color: 'white', backgroundColor: 'black'};
    } else if(val.toString().includes('-')) {
      return {height: 15, color: 'red', backgroundColor: 'black'};
    } else {
      return {height: 15, color: 'green', backgroundColor: 'black'};
    }
  }

  static getAddressBalanceStyle(){
    return {height: 15, color: 'green', backgroundColor: 'black'};
  }

  static getRankStyle(){
    return {height: 15, color: 'white', backgroundColor: 'black'};
  }

  populateGridData() {
    this.appRichAddressList.forEach((line: RichAddress) => {
      this.rowData.push(line);
    });
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }
}

