import { HttpClient, HttpParams } from '@angular/common/http';
import { defaultIfEmpty, flatMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IpostalCode {
  countryCode: string;
  postalCode: string;
  placeName: string;
  lng: number;
  lat: number;
}
export interface IPostalCodeService {
  resolvePostalCode(postalCode: string): Observable<IpostalCode>;
}
export interface IpostalCodeData {
  postalCodes: [IpostalCode];
}

@Injectable({
  providedIn: 'root',
})
export class PostalCodeService implements IPostalCodeService {
  constructor(private httpClient: HttpClient) {}
  resolvePostalCode(postalCode: string): Observable<IPostalCode> {
    const uriParams = new HttpParams()
      .set('maxRows', '1')
      .set('username', environment.username)
      .set('postalCode', postalCode);

    return this.httpClient
      .get<IpostalCodeData>(
        `${environment.baseUrl}${environment.geonamesApi}.geonames.org/postalCodeSearchJSON`,
        { params: uriParams }
      )
      .pipe(
        flatMap((data) => data.postalCodes),
        defaultIfEmpty(null)
      );
  }
}
