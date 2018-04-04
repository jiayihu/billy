import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import GeoService, { ICountry, IProvince } from './geo.service';

describe('GeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        GeoService
      ]
    });
  });

  describe('getCountries', () => {
    const mockResponse = {
      geonames: [
        { countryCode: 'UK', geonameId: 0, name: 'United Kingdom' },
        { countryCode: 'IT', geonameId: 1, name: 'Italy' }
      ] as ICountry[]
    };

    beforeEach(
      inject([MockBackend], (mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                body: JSON.stringify(mockResponse)
              })
            )
          );
        });
      })
    );

    it(
      'should get all countries with ICountry properties',
      inject([GeoService], (geoService: GeoService) => {
        geoService.getCountries().subscribe(countries => {
          countries.forEach(country => {
            expect(country.countryCode.length).toBe(2);
            expect(country.geonameId).toBeDefined();
            expect(country.name).toBeDefined();
          });
        });
      })
    );

    it(
      'should return the result sorted by name',
      inject([GeoService], (geoService: GeoService) => {
        geoService.getCountries().subscribe(countries => {
          expect(countries[0].name).toBe('Italy');
          expect(countries[1].name).toBe('United Kingdom');
        });
      })
    );

    it(
      'should return the same result from cache after the first request',
      inject([GeoService], (geoService: GeoService) => {
        geoService.getCountries().subscribe(countries => {
          geoService.getCountries().subscribe(countriesAgain => {
            expect(countries).toBe(countriesAgain);
          });
        });
      })
    );
  });

  describe('getProvinces', () => {
    const mockResponse = {
      geonames: [{ geonameId: 0, name: 'Padova' }, { geonameId: 1, name: 'Milano' }] as IProvince[]
    };

    beforeEach(
      inject([MockBackend], (mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                body: JSON.stringify(mockResponse)
              })
            )
          );
        });
      })
    );

    it(
      'should get all provinces with IProvince properties',
      inject([GeoService], (geoService: GeoService) => {
        geoService.getProvinces('IT').subscribe(provinces => {
          provinces.forEach(province => {
            expect(province.geonameId).toBeDefined();
            expect(province.name).toBeDefined();
          });
        });
      })
    );

    it(
      'should return the result sorted by name',
      inject([GeoService], (geoService: GeoService) => {
        geoService.getProvinces('IT').subscribe(provinces => {
          expect(provinces[0].name).toBe('Milano');
          expect(provinces[1].name).toBe('Padova');
        });
      })
    );

    it(
      'should return the same result from cache after the first request',
      inject([GeoService], (geoService: GeoService) => {
        geoService.getProvinces('IT').subscribe(provinces => {
          geoService.getProvinces('IT').subscribe(provincesAgain => {
            expect(provinces).toBe(provincesAgain);
          });
        });
      })
    );
  });
});
