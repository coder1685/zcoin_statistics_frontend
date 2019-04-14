import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class AppLoadService {
  public appRrichAddress: any;
  public totalSupply: any;

  constructor(private httpClient: HttpClient) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`initializeApp:: inside promise`);

      setTimeout(() => {
        console.log(`initializeApp:: inside setTimeout`);
        resolve();
      }, 3000);
    });
  }

  getRichAddress(): Promise<any> {
    console.log('getRichAddress:: before http.get call called at ', new Date().toUTCString());
    const headers = new HttpHeaders();
    headers.set('Content-Type','application/json')
           .set('Accept', 'application/json')
           .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
           .set('Access-Control-Allow-Origin', 'zcoinstatistics-prod.us-east-2')
           .set('Access-Control-Allow-Headers',
                   "X-Re quested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
    const promise = this.httpClient.get('http://zcoinstatistics-prod.us-east-2.elasticbeanstalk.com/zcoin/getRichAddressStatistics',
      {
        headers : headers
      })
      .toPromise()
      .then(richAddress => {
        console.log('RichAddress from API: ', richAddress);
        this.appRrichAddress = richAddress;
        return richAddress;
      });
    return promise;
  }

  getTotalSupply(): Promise<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type','application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
      .set('Access-Control-Allow-Origin', 'zcoinstatistics-prod.us-east-2')
      .set('Access-Control-Allow-Headers',
        "X-Re quested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
    const promise = this.httpClient.get('http://zcoinstatistics-prod.us-east-2.elasticbeanstalk.com/zcoin/totalSupply',
      {
        headers : headers
      })
      .toPromise()
      .then(totalSupply => {
        console.log('TotalSupply from API: ', totalSupply);
        this.totalSupply = totalSupply;
        return totalSupply;
      });
    return promise;
  }

}
