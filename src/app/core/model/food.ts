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
