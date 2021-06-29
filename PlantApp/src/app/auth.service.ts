import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtInterceptor } from './jwt.interceptor';

const API_URL = 'http://192.168.1.2:1337/api/'

@Injectable()
export class AuthService {     
    constructor(
        private interceptor: JwtInterceptor,
        private http: HttpClient,
        private JwtHelperService: JwtHelperService
        ) {
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
        let token = localStorage.getItem("token");
        if (token) {
            return !this.JwtHelperService.isTokenExpired(token);
        }
        else{
            return false;
        }  
    }

    public getToken(){
        return localStorage.getItem("token");
    }

/* OPGAVE 4, eerste deel
    Deze methode wordt aangeroepen wanneer een gebruiker correcte credentials heeft 
    ingevoerd (die worden gecheckt door de server). Het JWT bevat een idToken. Sla dit op in de local storage.
*/
    private setSession(authResult) {
        console.log("Setting session");

        localStorage.setItem("token", authResult.token);
        localStorage.setItem("tokenID", this.JwtHelperService.decodeToken(authResult.token).id);
        
        let temp = this.JwtHelperService.getTokenExpirationDate(authResult.token);
        let expireDate: Date;
        if (temp instanceof Date){
            expireDate = temp;
        }
        else {
            expireDate = new Date();
        }
        
        localStorage.setItem("tokenDate", expireDate.toDateString());
        
    }

/* OPGAVE 4: deel twee
    Deze methode moet de opgeslagen waarden die in het eerste deel van deze opgave 
    zijn opgeslagen weer uit de local storage verwijderen (en daarmee effectief de 
    bezoeker uitloggen).
*/
    public logout() {
        console.log("Logging out");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenID");
        localStorage.removeItem("tokenDate");
    }

/* OPGAVE 4: derde deel
    Deze methode haalt het expiratie moment weer uit de local storage, parseert het als JSON 
    en retourneert de waarde daarvan. Je kunt (opnieuw) gebruik maken van de library 'moments' 
    om de opgeslagen waarde weer om te zetten in een moment.
*/

    public getExpiration() {
        localStorage.getItem("tokenDate");
    } 

    private handleError(error) {
        console.error("ERROR...");
        console.log(error);
    }
}

interface User {
    name:String,
    password:String,
}
