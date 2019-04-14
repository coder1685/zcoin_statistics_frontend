import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppLoadService } from './app-load.service';

export function init_app(appLoadService: AppLoadService) {
  return () => appLoadService.initializeApp();
}

export function get_richAddress(appLoadService: AppLoadService) {
  return () => appLoadService.getRichAddress();
}

export function get_totalSupply(appLoadService: AppLoadService) {
  return () => appLoadService.getTotalSupply();
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    { provide: APP_INITIALIZER, useFactory: get_richAddress, deps: [AppLoadService], multi: true },
    { provide: APP_INITIALIZER, useFactory: get_totalSupply, deps: [AppLoadService], multi: true }
  ]
})
export class AppLoadModule { }
