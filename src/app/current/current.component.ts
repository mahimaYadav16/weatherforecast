import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Currentweather } from '../current-weather';
import { ActivatedRoute } from '@angular/router'
import 'rxjs/Rx';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  myWeather: Currentweather;
  constructor(private ws:WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data:{myWeather:CurrentComponent}) =>{
        this.myWeather = data.myWeather;
      }
    )
  }

  onSubmit(weatherForm: NgForm){
    console.log(weatherForm);

  }

}
