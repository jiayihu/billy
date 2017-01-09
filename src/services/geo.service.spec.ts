import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import GeoService, { ICountry } from './geo.service';

describe('GeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions],
        },
        GeoService,
      ],
    });
  });

  describe('getCountries', () => {
    const mockResponse = {
      geonames: [
        { countryCode: 'IT', geonameId: 0, name: 'Italy' },
      ] as ICountry[],
    };

    it('should get all countries with ICountry properties', inject(
      [GeoService, MockBackend],
      (geoService: GeoService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse),
          })));
        });

        geoService.getCountries().subscribe(countries => {
          countries.forEach(country => {
            expect(country.countryCode.length).toBe(2);
            expect(country.geonameId).toBeDefined();
            expect(country.name).toBeDefined();
          });
        });
      }),
    );
  });
});
