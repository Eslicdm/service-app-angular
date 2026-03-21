export enum ServiceType {
  FREE = 'FREE',
  HALF_PRICE = 'HALF_PRICE',
  FULL_PRICE = 'FULL_PRICE',
}

export const serviceTypeOptions: { value: ServiceType; viewValue: string }[] = [
  { value: ServiceType.FREE, viewValue: 'Free' },
  { value: ServiceType.HALF_PRICE, viewValue: 'Half Price' },
  { value: ServiceType.FULL_PRICE, viewValue: 'Full Price' },
];

export interface MemberRequest {
  id: number;
  email: string;
  serviceType: ServiceType;
}