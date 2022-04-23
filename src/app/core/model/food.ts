export interface ListFood {
  success: boolean;
  message: string;
  data: Food[];
}

export interface Food {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  storeId: string;
  price: number;
}

export interface CreateFoodResponse {
  success: boolean;
  message: string;
  data: idFood;
}

export interface idFood {
  id: string;
}

export interface GetFoodDetailResponse {
  success: boolean;
  message: string;
  data: Food;
}
