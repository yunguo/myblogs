//result.js
Page({
  data: {
    taxRate: 0, //适用税率
    deedTax: 0, //契税
    maintenanceFunds: 0, //维修基金
    stampDuty: 0, //印花税
    cardRegister: 0, //权证登记费
    cardProcedure: 0, //权证手续费
    cost: 0, //共有人工本费
    certificate: 0, //证照费
    propertyFee: 0, //物业费
    rateDifference: 0, //建筑补差价
    allTotalPrices: 0, //总共价格
  },
  allTaxRate: [1,1.5,2,3],
  areaBoundary:90,
  calculateSum: function (intTaxRate, formData) {
    let [propertyFee,cardRegister,stampDuty,deedTax,cardProcedure,allTotalPrices,area ,totalPrices,maintenanceFunds,cost]=[0,0,0,0,0,0,formData.area,formData.totalPrices,720 * (2.5 * 100) / (100 * 100) * (formData.area * 100),parseInt(formData.partOwner) * 10];
    switch (formData.propertyType) {
      case '0':
        propertyFee = 2.1 * 100 * (area * 100) * 6;
        cardRegister = 80;
        break;
      case '1':
        propertyFee = 50 * 100 * 100 * 6;
        cardRegister = 550;
        stampDuty = totalPrices * 5;
        cardProcedure = totalPrices * (0.005 * 10000) * (0.50 * 100);
        break;
      case '2':
        propertyFee = 5 * 100 * 100 * 6;
        cardRegister = 550;
        stampDuty = totalPrices * 5;
        cardProcedure = totalPrices * (0.005 * 10000) * (0.50 * 100);
        break;
      default:
        propertyFee = 2.1 * 100 * (area * 100) * 6;
        cardRegister = 80;
        break;
    }
    deedTax = parseFloat(((parseFloat(totalPrices) * 100) * (intTaxRate / 100) * 100) / 10000).toFixed(2);
    stampDuty = parseFloat(stampDuty / 10000).toFixed(2);
    maintenanceFunds = (maintenanceFunds / 100).toFixed(2);
    cardRegister = parseFloat(cardRegister).toFixed(2);
    cardProcedure = parseFloat(cardProcedure / 1000000).toFixed(2);
    propertyFee = parseFloat(propertyFee / 10000).toFixed(2);
    allTotalPrices = (deedTax * 100 + propertyFee * 100 + maintenanceFunds * 100 + stampDuty * 100 + cardProcedure * 100 + cost * 100 + cardRegister * 100 + 5 * 100) / 100;
    this.setData({
      taxRate: intTaxRate, //适用税率
      deedTax: deedTax, //契税
      maintenanceFunds: maintenanceFunds, //维修基金
      stampDuty: stampDuty, //印花税
      cardRegister: cardRegister, //权证登记费
      cardProcedure: cardProcedure, //权证手续费
      cost: cost, //共有人工本费
      certificate: '5', //证照费
      propertyFee: propertyFee, //物业费
      rateDifference: 0, //建筑补差价
      allTotalPrices: allTotalPrices, //总共价格
    });
  },
  onLoad: function () {
    let formData = wx.getStorageSync('formData') || wx.getStorage('formData');
    switch (formData.condition) {
      case '0':
        if (parseFloat(formData.area) <= this.areaBoundary) {
          this.calculateSum(this.allTaxRate[0], formData);
        } else {
          this.calculateSum(this.allTaxRate[1], formData);
        }
        break;
      case '1':
        if (parseFloat(formData.area) <= this.areaBoundary) {
          this.calculateSum(this.allTaxRate[0], formData);
        } else {
          this.calculateSum(this.allTaxRate[2], formData);
        }
        break;
      default:
        this.calculateSum(this.allTaxRate[3], formData);
        break;
    }
  }
});
