import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Currentweather } from './current-weather';


@Injectable()
export class WeatherService {
  myWeather:Currentweather;
  location;
  constructor(private http:HttpClient) { }

  localWeather(){
    return new Promise((res, rej)=>{
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        return this.http.get(`http://api.openweathermap.org/data/2.5/weather?appid=7d6f166ab33a78ac1e8bab405d9a7423

        &lat=${lat}&lon=${lon}&units=imperial`).map((response:Response) => response.json()).toPromise().then(
          (data) => {
            this.myWeather = new Currentweather(data.name, 
              data.main.temp, 
              data.weather[0].description, 
              data.main.temp_min, 
              data.main.temp_max, 
              data.weather[0].icon);
            res(this.myWeather);
          }
        );
      })
    })

    // return this.weather;
  }

  anotherCityWeather(city:string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?appid=7d6f166ab33a78ac1e8bab405d9a7423
    &q=${city}&units=imperial&cnt=10`).map((response:Response) => response.json());
  }

  sixteenDayForecast(city:string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=7d6f166ab33a78ac1e8bab405d9a7423
    &units=imperial`).map((response:Response) => response.json())
  }

}