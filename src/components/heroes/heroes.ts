import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Hero from '../../entities/hero';
import { HeroService } from '../../services/hero';
import HeroDetailComponent from '../hero-detail/hero-detail';

@Component({
  selector: 'heroes',
  styleUrls: ['src/components/heroes/heroes.css'],
  templateUrl: 'src/components/heroes/heroes.html',
  directives: [HeroDetailComponent],
})
export default class HeroesComponent implements OnInit {
  addingHero: boolean = false;
  error: any;
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit() {
    this.getHeroes();
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  deleteHero(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      })
      .catch(error => this.error = error);
  }

  getHeroes() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  gotoDetail(hero) {
    this.router.navigate(['detail', this.selectedHero.id]);
  }
}
