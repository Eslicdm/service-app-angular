import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment'
import { PriceModel, PriceType } from './price.model';

export type PriceUpdateDto = Pick<PriceModel, 'value' | 'description'>;

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}${environment.apiPaths.prices}`;

  getPrices(): Observable<PriceModel[]> {
    return this.http.get<PriceModel[]>(this.apiUrl);
  }

  upsertPrice(
    priceType: PriceType,
    priceUpdateDto: PriceUpdateDto
  ): Observable<PriceModel> {
    return this.http.put<PriceModel>(`${this.apiUrl}/${priceType}`, priceUpdateDto);
  }
}
