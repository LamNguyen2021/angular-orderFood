export interface CreateOrderRequest {
  storeId: string;
  status: string;
  orderItems: OrderItem[];
  totalMoney: number;
}

export interface UpdateOrderRequest {
  id: string;
  storeId: string;
  status: string;
  orderItems: OrderItem[];
  totalMoney: number;
}

export interface OrderItem {
  foodId: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  id: string;
  userId: string;
  storeId: string;
  status: string;
  totalMoney: number;
  createDate: Date;
  orderItems: OrderItem[];
}

export interface CartResponse {
  id: string;
  userId: string;
  storeId: string;
  status: string;
  totalMoney: number;
  createDate: Date;
  cartItems: CartItemResponse[];
}

export interface CartItemResponse {
  id: string;
  orderId: string;
  foodId: string;
  foodImageUrl: string;
  foodName: string;
  price: number;
  quantity: number;
}
