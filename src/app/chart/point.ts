import {DataPoint} from 'highcharts';

export class Point implements DataPoint {
  constructor (
    public x: number,
    public y: number,
    public name: string,
    public color: string){
    this.name = 'Point';
    this.color = '#00FF00';
  }
    public static newObject(): Point {
    return new Point(0, 0, '', '');
    }
}
