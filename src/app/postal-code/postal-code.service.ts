import { HttpClient, HttpParams } from '@angular/common/http';
import { defaultIfEmpty, flatMap, mergeMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IPostalCode{
  countryCode : string
  postalCode: string
  placeName : string
  lng : number
  lat : number
}
export const defaultPostalCode: IPostalCode = {
  countryCode: '--',
  postalCode: '--',
  placeName: '--',
  lng: 0,
  lat: 0,
}

export interface IPostalCodeData {
  postalCodes :  [IPostalCode]
}
export interface IPostalCodeService{
  resolvePostalCode(postalCode:string): Observable <IPostalCode | null>
}


@Injectable({
  providedIn: 'root'
})
export class PostalCodeService implements IPostalCodeService {

  constructor(private httpClient : HttpClient) { }
  resolvePostalCode(postalCode: string): Observable<IPostalCode> {
      const uriParams = new HttpParams()
        .set('postalcode', postalCode)
        .set('maxRows', '1')
        .set('username', environment.username)
      return this.httpClient
      .get<IPostalCodeData>(
        `${environment.baseUrl}${environment.geonamesApi}.geonames.org/postalCodeSearch`,
        { params: uriParams }
      )
      .pipe (
        mergeMap(data => data.postalCodes),
        defaultIfEmpty(defaultPostalCode)
      )
  }
}
