import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ICurrentWeather } from '../interfaces';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  private subscriptions = new SubSink();
  current$: Observable<ICurrentWeather>;
  constructor(private weatherService: WeatherService) {
    this.current$ = this.weatherService.currentWeather$;
  }

  ngOnInit(): void {
    /*  this.weatherService.currentWeather$.subscribe(
      (data) => (this.current = data)
    ); */
  }

  getOrdinal(date: number) {
    const n = new Date(date).getDate();
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : '';
  }

  ngOnDestroy(): void {
    //this.subscriptions.unsubscribe();
  }
}
