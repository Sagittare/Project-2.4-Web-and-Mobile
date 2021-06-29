import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { shareReplay, tap } from 'rxjs/operators';

const API_URL = 'http://192.168.1.2:1337/api/'

@Injectable({
  providedIn: 'root'
})
export class DataService {

 constructor(
   private interceptor: JwtInterceptor,
    private http: HttpClient
  ) { }

  getUserPlants(token:string | null) {
    return this.http.post(API_URL+'getUserPlants', {token})
      .pipe (
          tap ( 
              //res => this.parsePlants(res),
              //err => this.handleError(err),
          ),
          shareReplay()
      )
  }

  getPlantInformation(plantID:number) {
    return this.http.post(API_URL+'getPlantInformation', {plantID})
  }

  addPlant(name:string, description:string, notificationFrequency:number, wateramount:string, minTemp:string, maxTemp:string) {
    return this.http.post(API_URL+'addPlant', {name, description, notificationFrequency, wateramount, minTemp, maxTemp})
  }

  setUserPlant(plantID:number, description:string, name:string , token:string) {
    return this.http.post(API_URL+'setUserPlant', {plantID, description, name, token})
  }

  removeUserPlant(uniqueID:number) {
    return this.http.post(API_URL+'removeUserPlant', {uniqueID})
  }

  getPlants(){
    return this.http.get(API_URL+'getPlantList')
  }

}