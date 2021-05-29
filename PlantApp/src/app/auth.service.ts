import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { shareReplay, tap } from 'rxjs/operators'

import * as moment from 'moment'
import * as jwt_decode from 'jwt-decode';

// Pas eventueel de onderstaande link aan: dit moet verwijzen naar de plek waar 
// je de node-server (uit opgave 3) hebt draaien.

const API_URL = 'http://localhost:5000/api/'

@Injectable()
export class AuthService {     
    constructor(private http: HttpClient) {
    }
    
    login(name:string, password:string ) {
        return this.http.post<User>(API_URL+'login', {name, password})
            .pipe (
                tap ( 
                    res => this.setSession(res),
                    err => this.handleError(err),
                ),
                shareReplay()
            )
    }

    public isLoggedIn() {
        //return moment().isBefore(this.getExpiration());
    }


/* OPGAVE 4, eerste deel
    Deze methode wordt aangeroepen wanneer een gebruiker correcte credentials heeft 
    ingevoerd (die worden gecheckt door de server). Het JWT dat door de server wordt 
    teruggestuurd bevat een expiration-moment, opgeslagen in de property 'expiresIn'. 
    Je kunt gebruik maken van de library moments (die al is geïmporteerd) om deze 
    expiratie op te tellen bij het huidige moment. Sla deze waarop op in de local storage.
    Behalve deze expiratie bevat het JWT ook een idToken. Sla dit ook op in de local storage.
*/
    private setSession(authResult) {
        console.log("Setting session")
    }

/* OPGAVE 4: deel twee
    Deze methode moet de opgeslagen waarden die in het eerste deel van deze opgave 
    zijn opgeslagen weer uit de local storage verwijderen (en daarmee effectief de 
    bezoeker uitloggen).
*/
    public logout() {
        console.log("Logging out")
    }

/* OPGAVE 4: derde deel
    Deze methode haalt het expiratie moment weer uit de local storage, parseert het als JSON 
    en retourneert de waarde daarvan. Je kunt (opnieuw) gebruik maken van de library 'moments' 
    om de opgeslagen waarde weer om te zetten in een moment.
*/

    public getExpiration() {
        console.log("Get experiation as json...")
    } 

    private handleError(error) {
        console.error("ERROR...")
        console.log(error)
    }
}

interface User {
    name:String,
    password:String,
}
