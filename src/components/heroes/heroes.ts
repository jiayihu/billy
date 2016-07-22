import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Hero from '../../entities/hero';
import { HeroService } from '../../services/hero';

@Component({
  selector: 'heroes',
  styleUrls: ['src/components/heroes/heroes.css'],
  template: `
    <h2>My heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <div *ngIf="selectedHero">
      <h2>
        {{selectedHero.name | uppercase}} is my hero
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
  `,
})
export default class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit() {
    this.getHeroes();
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
