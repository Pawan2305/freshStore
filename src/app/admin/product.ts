export class Products {

    constructor(
      public productName = '',
      public category = '',
      public pricePerKg = 0.0,
      public marketPrice = 0.0,
      public totalQty = 0,
      public qtyRemain = 0,
      public image = ''
    ){}
  }