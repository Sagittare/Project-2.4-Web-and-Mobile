import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

// Hoe heet de techniek die hier gebruikt wordt om deze huidige klasse
// te laten beschikken over die AuthService en die Router?
  constructor(public auth: AuthService, public router: Router) {}

/* OPGAVE 4, vierde deel
    Deze methode wordt gebruikt door de Routes in app-routing.module. Op het moment 
    dat een pad naar een bepaalde route wordt opgevraagd, wordt gekeken of de property 
    canActivate is gedefinieerd. Als dat zo is, wordt de corresponderende methode in 
    het object dat als waarde van die property is meegegeven (deze auth-guard, dus) 
    aangeroepen (deze methode, dus). Deze methode moet een boolean teruggeven, die 
    weergeeft of de huidige client het pad mag volgen of niet.
    Implementeer deze methode. Kijk of de huidige client is ingelogd. Als dat niet 
    het geval is, stuur de client dan terug naar 'login. Retourneer in het andere 
    geval gewoon een true.
*/
  canActivate(): boolean { 
    return true;
  }

}