export interface ExhibitionElement {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  availableToBuy: boolean;
  priceTag?: number;
}