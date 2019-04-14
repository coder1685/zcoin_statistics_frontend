export class RichAddress {

  constructor(public rank: string,
              public address: string,
              public balance: number,
              public supply: string,
              public balanceInTenMinutes: string,
              public balanceInOneHour: string,
              public balanceInOneDay: string,
              public balanceInOneMonth: string,
              public balanceInOneWeek: string,
              public dateList: Array<Date>,
              public amountList: Array<number>) {
  }

  public static newObject(): RichAddress {
    return new RichAddress( '', '' , 0, '', '' , '',
      '', '',  '', [], []);
  }

}
