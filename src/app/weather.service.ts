import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface forecastItems {
  temperature: number;
  weatherIcon: string;
}
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '7d161af07063f4617a9b93e72ada2cbf';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  getWeatherByLocation(location: string): Observable<any> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiKey}`;
    return this.http.get(apiUrl);
  }
  // getWeatherForecast(location: string): Observable<any> {
  //   const params = { q: location, appid: this.apiKey };
  //   return this.http.get(this.apiUrl, { params });
  // }
  getOneWeekWeatherForecast(location: string): Observable<any> {
    // Set cnt to 7 days * 8 intervals per day
    const params = { q: location, appid: this.apiKey, cnt: 56 }; // Ensure cnt is an integer
    return this.http.get(`${this.apiUrl}/forecast`, { params });
  }

}
