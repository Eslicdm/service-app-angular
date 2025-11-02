export enum PriceType {
  FREE = 'FREE',
  HALF_PRICE = 'HALF PRICE',
  FULL_PRICE = 'FULL PRICE',
}

export interface PriceModel {
  id?: string;
  priceType: PriceType;
  value: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
