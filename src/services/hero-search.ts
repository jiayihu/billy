import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import Hero from '../entities/hero';

@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}

  search(term: string) {
    return this.http.get(`app/heroes/?name=${term}`)
      .map((response: Response)=> response.json().data as Hero[]);
  }
}
