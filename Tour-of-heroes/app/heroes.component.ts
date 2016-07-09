import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
   styleUrls: ['app/heroes.component.css'],
   templateUrl: 'app/heroes.component.html'
})
export class HeroesComponent implements OnInit
{
   title = 'Tour of Heroes';
   selectedHero: Hero;

   heroes: Hero[];

   constructor(
      private router: Router,
      private heroService: HeroService) { }

   getHeroes() {
      this.heroService.getHeroes().then( heroes => this.heroes = heroes);
   }

   ngOnInit() {
      this.getHeroes();
   }
   
   onSelect( hero: Hero) { this.selectedHero = hero; }

   gotoDetail() {
      this.router.navigate( ['/detail', this.selectedHero.id]);
   }
                          
}

