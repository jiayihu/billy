import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
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
  private countriesSource: Observable<ICountry[]>;
  private provincesByCountry: { [key: string]: IProvince[] } = {};

  constructor(private http: HttpClient) {}

  static sortByName(a, b): number {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;

    return 0;
  }

  getCountries(): Observable<ICountry[]> {
    if (!this.countriesSource) {
      let searchParams = new HttpParams({ fromString: 'q=&featureCode=PCLI&maxRows=1000' });
      searchParams = searchParams.append('username', this.apiUsername);

      this.countriesSource = this.http
        .get(ENDPOINT, { params: searchParams })
        .map((response: any) => response.geonames)
        .map(countries => countries.sort(GeoService.sortByName))
        .publishLast()
        .refCount();
    }

    return this.countriesSource;
  }

  getProvinces(countryCode: string): Observable<IProvince[]> {
    const cachedProvinces = this.provincesByCountry[countryCode];
    if (cachedProvinces) return Observable.of(cachedProvinces);

    let searchParams = new HttpParams({ fromString: 'q=adm2&maxRows=1000' });
    searchParams = searchParams.append('username', this.apiUsername);
    searchParams = searchParams.append('country', countryCode);
    searchParams = searchParams.append('lang', countryCode);

    return this.http
      .get(ENDPOINT, { params: searchParams })
      .map((response: any) => response.geonames)
      .map((provinces: IProvince[]) => {
        const sortedProvinces = provinces.sort(GeoService.sortByName);
        this.provincesByCountry[countryCode] = provinces;

        return sortedProvinces;
      });
  }
}
