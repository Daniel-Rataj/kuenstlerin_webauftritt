export interface ExhibitionElement {
  id?: number;
  name: string;
  description: string;
  imageFile?: File; // for Uploads via FormData
  imageUrl: string; // to retrieve the File from the storage via Url
  availableToBuy: boolean;
  priceTag?: number;
  exhibitionId?: number;
  width: number;
  length: number;
}