import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Hero from '../../entities/hero';
import { HeroService } from '../../services/hero';
import HeroSearchComponent from '../hero-search/hero-search';

@Component({
  selector: 'dashboard',
  styleUrls: ['src/components/dashboard/dashboard.css'],
  templateUrl: 'src/components/dashboard/dashboard.html',
  directives: [HeroSearchComponent],
})
export default class DashboardComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  gotoDetail(hero: Hero) {
    const link = ['detail', hero.id];

    this.router.navigate(link);
  }
}
