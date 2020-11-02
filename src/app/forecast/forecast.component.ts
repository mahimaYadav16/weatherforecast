import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Forecast } from '../forecast';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor(private weatherSer:WeatherService) { }

  forecastForm:FormGroup;
  cityforecast:Forecast[]=[];

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('')
    });
  }

  onSubmit(){
    this.cityforecast.splice(0, this.cityforecast.length);
    this.weatherSer.sixteenDayForecast(this.forecastForm.value.forecastCity).subscribe(
      (data) =>{
        for(let i=0; i<data.list.length; i= i+8){
          const forecastWeather = new Forecast(data.list[i].temp_max,
                                                data.list[i].temp_min,
                                                data.list[i].dt_txt,
                                                data.list[i].weather[0].icon);
          this.cityforecast.push(forecastWeather);
        }
        return this.cityforecast;
      }
    )
  }
}

