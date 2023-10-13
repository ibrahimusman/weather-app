import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

interface ForecastItem {
  temperature: any;
  weatherIcon: string;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'], // Ensure the file extension is correct
})
export class LocationComponent implements OnInit {
  selectedLocation = 'New York'; // Default location
  weatherData: any;
  temperature: any;
  humidity: any;
  windSpeed: any;
  pressure: any;
  sunriseTime: any;
  sunsetTime: any;
  currentDate = new Date();
  forecastItems: ForecastItem[] = []; // Initialize as an empty array of the correct type

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeather();
    this.getOneWeekWeatherForecast();
  }

  getWeather() {
    this.weatherService.getWeatherByLocation(this.selectedLocation).subscribe((data) => {
      this.weatherData = data;
      this.weatherData.main.temp = (this.weatherData.main.temp - 273.15).toFixed(2);
      this.weatherData.main.feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(2);
      this.humidity = this.weatherData.main.humidity;
      this.windSpeed = this.weatherData.wind.speed;
      this.pressure = this.weatherData.main.pressure;
      this.sunriseTime = new Date(this.weatherData.sys.sunrise * 1000);
      this.sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    });
  }

  getWeatherIconUrl(iconName: string) {
    return `http://openweathermap.org/img/w/${iconName}.png`;
  }

  getOneWeekWeatherForecast() {
    this.weatherService.getOneWeekWeatherForecast(this.selectedLocation).subscribe((data) => {
      const forecastData = data.list;
      // Extract temperature and weather icon for each forecast interval
      this.extractTemperatureAndWeatherIcon(forecastData);
    });
  }

  extractTemperatureAndWeatherIcon(forecastData: any[]) {
    // Clear previous data
    this.forecastItems = [];
    for (const forecast of forecastData) {
      const temperature = forecast.main.temp;
      const weatherIcon = forecast.weather[0].icon;
      // Push temperature and weather icon to the array
      this.forecastItems.push({ temperature, weatherIcon });
    }
  }
  darkMode = false;
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    const image = document.getElementById('imgClickAndChange');
    const body = document.getElementsByClassName('weather-container')[0];
    if (body !== null) {
      if (this.darkMode) {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }

      if (image !== null) {
        if (this.darkMode) {
          image.setAttribute('src', 'assets/images/tamperature-white.png');
        } else {

          image.setAttribute('src', 'assets/images/tamperature.png');
        }

      }
    }
  }
}
