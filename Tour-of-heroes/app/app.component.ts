import { Component }       from '@angular/core';
// import { RouterLink, RouterOutlet }      from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';

@Component({
   selector: 'my-app',
   template: `
  <h1>{{title}}</h1>
  <a [routerLink]="['/heroes']">Heroes</a>
  <router-outlet></router-outlet>
`,
   directives: [HeroesComponent /*, RouterLink, RouterOutlet */],
   providers: [
      HeroService,
      ROUTER_DIRECTIVES
   ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
