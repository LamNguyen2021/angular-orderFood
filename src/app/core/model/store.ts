export interface ListStore {
  success: boolean;
  message: string;
  data: Store[];
}

export interface StoreDetail {
  success: boolean;
  message: string;
  data: Store;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  location: string;
  imageUrl: string;
  quantityFood: number | null;
  donViTinh: string | null;
}

export interface CreateStoreResponse {
  success: boolean;
  message: string;
  data: IdNewStore;
}

export interface IdNewStore {
  id: string;
}
