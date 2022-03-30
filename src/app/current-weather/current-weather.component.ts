import { Component, Input, OnInit } from '@angular/core';

import { ICurrentWeather } from '../interfaces';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  @Input() current$ : Observable<ICurrentWeather>
  constructor(private weatherService:WeatherService) {
    this.current$ = this.weatherService.currentWeather$
   }

  ngOnInit(): void {
    // this.weatherService.currentWeather$
    //   .subscribe((data) => (this.current$ = data))
  }

    // Attribution: https://stackoverflow.com/a/44418732/178620
    getOrdinal(date: number) {
      const n = new Date(date).getDate()
      return n > 0
        ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : ''
    }

}
