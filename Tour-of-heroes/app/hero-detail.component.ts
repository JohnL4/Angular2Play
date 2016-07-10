import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
   styleUrls: ['app/hero-detail.component.css'],
   templateUrl: 'app/hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit, OnDestroy
{

   @Input()
   hero: Hero;

   @Output()
   close = new EventEmitter();

   error: any;
   
   sub: any;

   navigated = false; // True if navigated here (TODO: no boolean type?) I think this means that we reached this view
                      // via browser navigation (url click?).

   constructor(
      private heroService: HeroService,
      private route: ActivatedRoute)
   {
   }

   ngOnInit() {
      this.sub = this.route.params.subscribe( params => {
         if (params['id'] === undefined) {
            this.navigated = false;
            this.hero = new Hero();
         }
         else {
            let id = +params['id']; // TODO: what's with the "+" notation? Forcing a string to a number?
            this.navigated = true;
            this.heroService.getHero( id)
               .then( hero => this.hero = hero);
         }
      });
   }

   save() {
      this.heroService
         .save( this.hero)
         .then( hero => {
            this.hero = hero; // Return value from service will have fields like 'id' updated w/new values assigned during save
            this.goBack( hero);
         })
         .catch( error => this.error = error); // TODO: display error message
   }

   ngOnDestroy() {
      this.sub.unsubscribe();
   }

   /** Go backwards in browser history.
    */
   goBack( savedHero: Hero = null) {
      this.close.emit( savedHero);
      if (this.navigated) {
         window.history.back();
      }
   }
   
}
