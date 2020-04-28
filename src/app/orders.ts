export interface Orders{
    orderId: number;
    customerEmail: string; 
    customerName?: string;
    phone?: string; 
    deliveryType: string;
    addressId: number;
    orderDate: string;
    shipDate?:string;
    deliveryDate?: string;
    deliveryCharge: number;
    orderStatus: string;
    totalAmt: number;
    totalDiscount: number;
    cancelDate?: string;
    cancelReason?: string;
}

export interface OrderDetails{
    orderDetailId: number;
    orderId: number;
    productId: number;
    price: number;
    discount: number;
    quantity: number;
}

export interface ProductDetails extends OrderDetails{
    productName: string;
    pricePerKg: number;
    image: string;
}