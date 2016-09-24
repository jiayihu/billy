import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

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

  constructor(private http: Http) {}

  private sortByName(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;

    return 0;
  }

  getCountries() {
    const searchParams = new URLSearchParams('q=&featureCode=PCLI&maxRows=1000');
    searchParams.append('username', this.apiUsername);

    return this.http.get(ENDPOINT, { search: searchParams })
      .toPromise()
      .then(response => response.json().geonames)
      .then(countries => countries.sort(this.sortByName));
  }

  getProvinces(countryCode: string) {
    const searchParams = new URLSearchParams('q=adm2&maxRows=1000');
    searchParams.append('username', this.apiUsername);
    searchParams.append('country', countryCode);

    return this.http.get(ENDPOINT, { search: searchParams })
      .toPromise()
      .then(response => response.json().geonames)
      .then((provinces: IProvince[]) => {
        if (countryCode === 'IT') {
          return provinces.map(province => {
            province.name = province.name.replace(/(Province|Provincia) (of|di) /, '');
            return province;
          });
        }

        return provinces;
      })
      .then((provinces: IProvince[]) => provinces.sort(this.sortByName));
  }
}
