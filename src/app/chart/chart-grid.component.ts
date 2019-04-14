import {AgRendererComponent} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid';
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  template: '<button class="img-responsive" (click)="zcoinChart()"> <img class="ag-fresh" src="assets/image/zcoin.png" /></button>',
  styleUrls: ['./chart-grid.component.css']
})
export class ChartGridComponent implements AgRendererComponent {

  private id: string = null;

  constructor(private router: Router) {}

  refresh(params: any): boolean {
    return undefined;
  }

  agInit(params: ICellRendererParams): void {
    this.id = params.value;
  }

  zcoinChart(): void {
    this.router.navigate(['/chart', this.id]);
  }

}
