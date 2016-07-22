import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
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
      <button (click)="save()">Save</button>
      <button (click)="goBack()">Go back</button>
    </div>
  `
})
export default class HeroDetailComponent implements OnInit, OnDestroy {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated: boolean = false;

  constructor(private heroService: HeroService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        const id = Number(params['id']);
        this.navigated = true;
        this.heroService.getHero(id).then(hero => this.hero = hero);
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(savedHero: Hero = null) {
    this.close.emit(savedHero);
    if (this.navigated) window.history.back();
  }

  save() {
    this.heroService
      .save(this.hero)
      .then(hero => {
        this.hero = hero;
        this.goBack(hero);
      })
      .catch(error => this.error = error);
  }
}
