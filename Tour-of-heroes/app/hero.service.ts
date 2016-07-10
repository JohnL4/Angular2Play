import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

   private heroesUrl = 'app/heroes'; // URL to web api

   constructor( private http: Http) {}
   
   getHeroes(): Promise<Hero[]> {
      // return HEROES; // (no promise)
      // return Promise.resolve( HEROES);
      return this.http.get( this.heroesUrl)
         .toPromise()
         .then( response => response.json().data)
         .catch( this.handleError);
   }

//   /** Simulates a slow d/b connection.
//    */
//   getHeroesSlowly() {
//      return new Promise<Hero[]>(
//         resolve => setTimeout(() => resolve( HEROES), 2000)); // 2 seconds
//   }

   getHero( id: number) {
      return this.getHeroes()
         .then( heroes => heroes.find( hero => hero.id === id));
   }

   // POST vs PUT: See http://stackoverflow.com/questions/630453/put-vs-post-in-rest
   
   /** Add new hero -- we don't have an id yet, so there's no specific URL to "update"
    */
   private post( hero: Hero) {
      // TODO: find out why these headers are created differently from the ones in put()
      let headers = new Headers({
         'Content-Type': 'application/json'});

      return this.http
         .post( this.heroesUrl, JSON.stringify( hero), {headers: headers})
         .toPromise()
         .then( res => res.json().data)
         .catch( this.handleError);
   }

   /** Update existing hero (PUT is idempotent, btw)
    */
   private put( hero: Hero) {
      // TODO: find out why these headers are created differently from the ones in post()
      let headers = new Headers();
      headers.append( 'Content-Type', 'application/json');

      let url = `${this.heroesUrl}/${hero.id}`;

      return this.http
         .put( url, JSON.stringify( hero), {headers: headers})
         .toPromise()
         .then( () => hero)
         .catch( this.handleError);
   }

   /** Delete hero.
    */
   delete( hero: Hero) {
      let headers = new Headers();
      headers.append( 'Content-Type', 'application/json');

      let url = `${this.heroesUrl}/${hero.id}`;

      return this.http
         .delete( url, headers)
         .toPromise()
         .catch( this.handleError);
   }

   /** Save new or updated hero -- figure out which of post(), put() to call.
    */
   save( hero: Hero): Promise<Hero> {
      if (hero.id) {
         // Update
         return this.put( hero);
      }
      else {
         // Add
         return this.post( hero);
      }
   }
   
   private handleError( error: any) {
      console.error( 'An error occurred', error);
      return Promise.reject( error.message || error);
   }
}
