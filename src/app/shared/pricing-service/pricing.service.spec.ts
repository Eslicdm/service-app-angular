import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { PriceUpdateDto, PricingService } from './pricing.service';
import { PriceModel, PriceType } from './price.model';
import {provideHttpClient} from '@angular/common/http';
import {environment} from 'environment';

describe('PricingService', () => {
  let service: PricingService;
  let httpTestingController: HttpTestingController;
  const pricesUrl = `${environment.apiUrl}${environment.apiPaths.prices}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        PricingService
      ]
    });
    service = TestBed.inject(PricingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPrices', () => {
    it('should return an array of prices on success', () => {
      const mockPrices: PriceModel[] = [
        { id: '1', priceType: PriceType.FREE, value: 0, description: 'Free tier', createdAt: new Date(), updatedAt: new Date() },
        { id: '2', priceType: PriceType.FULL_PRICE, value: 100, description: 'Full price tier', createdAt: new Date(), updatedAt: new Date() }
      ];

      service.getPrices().subscribe(prices => {
        expect(prices.length).toBe(2);
        expect(prices).toEqual(mockPrices);
      });

      const req = httpTestingController.expectOne(pricesUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockPrices);
    });
  });

  describe('upsertPrice', () => {
    it('should send a PUT request and return the updated price', () => {
      const priceType = PriceType.HALF_PRICE;
      const priceUpdateDto: PriceUpdateDto = {
        value: 50,
        description: 'Half price promotion'
      };
      const mockUpdatedPrice: PriceModel = {
        id: '1',
        priceType: priceType,
        ...priceUpdateDto,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      service.upsertPrice(priceType, priceUpdateDto).subscribe(price => {
        expect(price).toEqual(mockUpdatedPrice);
      });

      const req = httpTestingController.expectOne(`${pricesUrl}/${priceType}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(priceUpdateDto);
      req.flush(mockUpdatedPrice);
    });
  });
});
