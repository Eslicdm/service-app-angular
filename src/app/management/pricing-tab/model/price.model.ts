export type PriceType = 'free' | 'half-price' | 'full-price';

export interface PriceModel {
  id: string;
  priceType: PriceType;
  value: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
