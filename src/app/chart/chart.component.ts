import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {AppLoadService} from '../app-load/app-load.service';
import {RichAddress} from '../app-load/richAddress';
import { Chart } from 'angular-highcharts';
import {Point} from './point';
import {AxisOptions} from 'highcharts';

@Component({
  selector: 'chart-app',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart: Chart;

  appRichAddressList: Array<RichAddress> = [];
  address: string = null;
  balance: number = null;
  dateList: Array<Date> = [];
  amountList: Array<number> = [];
  constructor(private route: ActivatedRoute,
              private location: Location,
              private appLoadService: AppLoadService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.address  = id;
      console.log('ID ' + id);
      this.getAddressDetails();
    });
    this.init();
  }

  init() {
    const chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: this.address + '<b>' + ' Supply ' + this.balance.toLocaleString() + '</b>'
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
          text: 'Amount'
        }
      },
      xAxis: {
        title: {
          text: 'Time'
        },
        type: 'datetime',
        labels: {
          format: '{value:%b %e, %Y}'
        },

      },
      tooltip: {
        pointFormatter: function() {
          return '<b>' + 'Balance ' + '</b>' + this.y.toLocaleString();
        }
      },
      plotOptions: {
        series: {
          turboThreshold: 10000
        }
      }
    });
    this.chart = chart;
    this.chart.options.series = new Array();
    this.chart.options.series[0] = new Object();
    this.chart.options.series[0].name = 'Rich Address Statistics';
    this.chart.options.series[0].data = new Array();
    for (let i in this.dateList) {
      this.chart.options.series[0].data.push(
        {
          x: this.getTimeStamp(this.dateList[i]),
          y: this.amountList[i],
          name: new Date(this.dateList[i]).toUTCString(),
          color: '#00FF00'
        },
      );
    }
  }

  getTimeStamp(date: Date) {
    return Date.UTC(new Date(date).getUTCFullYear(), new Date(date).getMonth(), new Date(date).getDate(),
      new Date(date).getUTCHours(), new Date(date).getMinutes(), new Date(date).getSeconds(), new Date(date).getMilliseconds());
  }

  onChartClick(event) {
    console.log(event);
  }

  newDate(days): Date {
    return new Date(new Date() + days);
  }

  goBack(): void {
    this.location.back();
  }

  getAddressDetails() {
    this.appRichAddressList = this.appLoadService.appRrichAddress;
    let addressDetails: Array<RichAddress> = [];
    addressDetails = this.appRichAddressList.filter(
      (richAddress: RichAddress) => richAddress.address === this.address
    );
    this.amountList = addressDetails[0].amountList;
    this.dateList = addressDetails[0].dateList;
    this.balance = addressDetails[0].balance;
  }
}
