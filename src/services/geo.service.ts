import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

const ENDPOINT = 'http://ws.geonames.org/searchJSON';

export interface ICountry {
  countryCode: string;
  geonameId: number;
  name: string;
}

export interface ICity {
  geonameId: number;
  name: string;
}

@Injectable()
export default class GeoService {
  private apiUsername: string = process.env.GEONAMES;

  constructor(private http: Http) {}

  getCountries() {
    const searchParams = new URLSearchParams('q=&featureCode=PCLI&maxRows=1000');
    searchParams.append('username', this.apiUsername);

    return this.http.get(ENDPOINT, { search: searchParams })
      .toPromise()
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      });
  }

  getCities() {
    const searchParams = new URLSearchParams('q=adm2&country=IT&maxRows=1000');
    searchParams.append('username', this.apiUsername);

    return this.http.get(ENDPOINT, { search: searchParams })
      .toPromise()
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      });
  }
}
