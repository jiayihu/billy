import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const ENDPOINT = 'http://ws.geonames.org/searchJSON';

export interface ICountry {
  countryCode: string;
  geonameId: number;
  name: string;
}

export interface IProvince {
  geonameId: number;
  name: string;
}

@Injectable()
export default class GeoService {
  private apiUsername: string = process.env.GEONAMES;
  private countries: ICountry[];
  private countriesSource: Observable<ICountry[]>;

  constructor(private http: Http) {}

  static sortByName(a, b): number {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;

    return 0;
  }

  getCountries(): Observable<ICountry[]> {
    if (this.countries) return Observable.of(this.countries);
    if (this.countriesSource) return this.countriesSource;

    const searchParams = new URLSearchParams('q=&featureCode=PCLI&maxRows=1000');
    searchParams.append('username', this.apiUsername);

    this.countriesSource = this.http.get(ENDPOINT, { search: searchParams })
      .map(response => {
        this.countriesSource = null;
        this.countries = response.json().geonames;

        return this.countries;
      })
      .map(countries => countries.sort(GeoService.sortByName))
      .share();

    return this.countriesSource;
  }

  getProvinces(countryCode: string): Observable<IProvince[]> {
    const searchParams = new URLSearchParams('q=adm2&maxRows=1000');
    searchParams.append('username', this.apiUsername);
    searchParams.append('country', countryCode);
    searchParams.append('lang', countryCode);

    return this.http.get(ENDPOINT, { search: searchParams })
      .map(response => response.json().geonames)
      .map((provinces: IProvince[]) => provinces.sort(GeoService.sortByName));
  }
}
