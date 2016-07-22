import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { HeroSearchService } from '../../services/hero-search';
import Hero from '../../entities/hero';

@Component({
  selector: '<hero-search>',
  template: `
  <div id="search-component">
    <h4>Hero Search</h4>
    <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
    <div>
      <div *ngFor="let hero of heroes | async" (click)="gotoDetail(hero)" class="search-result" >
        {{hero.name}}
      </div>
    </div>
  </div>
  `,
  providers: [HeroSearchService],
})
export default class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  searchSubject = new Subject<string>();

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.heroes = this.searchSubject
      .asObservable()
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
      .catch(error => {
        console.error(error);
        return Observable.of<Hero[]>([]);
      })
  }

  gotoDetail(hero: Hero) {
    this.router.navigate(['detail', hero.id]);
  }

  search(term: string) {
    this.searchSubject.next(term);
  }
}
