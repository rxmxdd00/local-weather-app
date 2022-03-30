import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  PostalCodeService,
  defaultPostalCode,
} from '../postal-code/postal-code.service';
import { map, switchMap } from 'rxjs/operators';

import { ICurrentWeather } from '../interfaces';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}

export const defaultWeather: ICurrentWeather = {
  city: '--',
  country: '--',
  date: Date.now(),
  image: '',
  temperature: 0,
  description: '',
};
export interface IWeatherService {
  getCurrentWeather(
    search: string | number,
    country?: string
  ): Observable<ICurrentWeather>;
  getCurrentWeatherByCoords(
    coords: GeolocationCoordinates
  ): Observable<ICurrentWeather>;
  updateCurrentWeather(searchText: string, country?: string): void;
  readonly currentWeather$: BehaviorSubject<ICurrentWeather>;
  getCurrentWeather(
    city: string,
    country?: string
  ): Observable<ICurrentWeather>;

  updateCurrentWeather(searchText: string, country?: string): void;
}
@Injectable({
  providedIn: 'root',
})
export class WeatherService implements IWeatherService {
  readonly currentWeather$ = new BehaviorSubject<ICurrentWeather>(
    defaultWeather
  );
  constructor(
    private httpClient: HttpClient,
    private postalCodeService: PostalCodeService
  ) {}

  getCurrentWeatherByCoords(coords: {
    latitude: number;
    longitude: number;
  }): Observable<ICurrentWeather> {
    const uriParams = new HttpParams()
      .set('lat', coords.latitude.toString())
      .set('lon', coords.longitude.toString());
    return this.getWeatherHelper(uriParams);
  }

  updateCurrentWeather(search: string, country?: string): void {
    this.getCurrentWeather(search, country).subscribe((weather) =>
      this.currentWeather$.next(weather)
    );
  }

  getCurrentWeather(
    searchText: string,
    country?: string
  ): Observable<ICurrentWeather> {
    return this.postalCodeService.resolvePostalCode(searchText).pipe(
      switchMap((postalCode) => {
        if (postalCode && postalCode !== defaultPostalCode) {
          return this.getCurrentWeatherByCoords({
            latitude: postalCode.lat,
            longitude: postalCode.lng,
          })
        } else {
          const uriParams = new HttpParams().set(
            'q',
            country ? `${searchText},${country}` : searchText
          )

          return this.getWeatherHelper(uriParams)
        }
      })
    );
  }

  private getWeatherHelper(uriParams: HttpParams): Observable<ICurrentWeather> {
    uriParams = uriParams.set('appid', environment.appId);
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
        { params: uriParams }
      )
      .pipe(map((data) => this.transformToICurrentWeather(data)));
  }

  private transformToICurrentWeather(
    data: ICurrentWeatherData
  ): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    };
  }
  private convertKelvinToFahrenheit(kelvin: number) {
    return (kelvin * 9) / 5 - 459.67;
  }
}
