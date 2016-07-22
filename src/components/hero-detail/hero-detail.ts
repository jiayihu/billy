import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Hero from '../../entities/hero';
import { HeroService } from '../../services/hero';

@Component({
  selector: 'hero-detail',
  styleUrls: ['src/components/hero-detail/hero-detail.css'],
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>{{hero.name}}
        <input type="text" [(ngModel)]="hero.name" placeholder="Hero's name" />
      </div>
      <button (click)="goBack()">Go back</button>
    </div>
  `
})
export default class HeroDetailComponent implements OnInit, OnDestroy {
  hero: Hero;
  sub: any;

  constructor(private heroService: HeroService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.heroService.getHero(id).then(hero => this.hero = hero);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack() {
    window.history.back();
  }
}
