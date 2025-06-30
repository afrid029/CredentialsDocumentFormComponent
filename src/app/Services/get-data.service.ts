import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  data: any[] = [
    {
      Id: 1,
      awardeddate: '01-06-2025',
      certification: 'wqeqweqweqweqwe',
      city: 'daddasdsa',
      country: { name: 'Australia' },
      expirydate: '26-06-2025',
      institution: 'eqeqwqwqwee',
    },
    {
      Id: 4,
      awardeddate: '01-06-2023',
      certification: 'Diploma',
      city: 'Jaipur',
      country: { name: 'Canada' },
      expirydate: '26-07-2032',
      institution: 'Zahira',
    },
    {
      Id: 2,
      awardeddate: '01-04-2022',
      certification: 'Dgewwd',
      city: 'Nsklo',
      country: { name: 'Australia' },
      expirydate: '26-04-2023',
      institution: 'Shrew',
    },
    {
      Id: 3,
      awardeddate: '01-07-2021',
      certification: 'Master',
      city: 'Colombo',
      country: { name: 'Australia' },
      expirydate: '26-06-2020',
      institution: 'Neslo',
    },
  ];

  constructor(private http: HttpClient) {}

  getCountry(): Observable<any> {
    return this.http.get('https://www.apicountries.com/countries');
  }

  getData() {
    return this.data;
  }
}
