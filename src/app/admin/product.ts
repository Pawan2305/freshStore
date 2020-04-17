export class Products {
  constructor(
    public productId = 0,
    public productName = '',
    public category = '',
    public pricePerKg = 0.0,
    public marketPrice = 0.0,
    public totalQty = 0,
    public qtyRemain = 0,
    public image = ''
  ){}
}

export class SelectedProducts extends Products{
  public selected: boolean;
  constructor( ){
    super();
    this.selected = false;
  }
}

export class CartProducts{

  productId: number;
  productName: string;
  pricePerKg: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

