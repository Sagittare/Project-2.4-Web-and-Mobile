import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


const API_URL = 'http://192.168.1.2:1337/api/'

@Injectable({
  providedIn: 'root'
})
export class DataService {

 constructor(
    private http: HttpClient
  ) { }

  getUserPlants() {
    return this.http.get(API_URL+'getUserPlants')
  }

  getPlantInformation(plantID:number) {
    return this.http.post(API_URL+'getPlantInformation', {plantID})
  }

  addPlant(name:string, description:string, notificationFrequency:number, wateramount:string ) {
    return this.http.post(API_URL+'addPlant', {name, description, notificationFrequency, wateramount})
  }

  setUserPlant(plantID:number, description:string | null, name:string | null ) {
    return this.http.post(API_URL+'setUserPlant', {plantID, description, name})
  }

  removeUserPlant(uniqueID:number) {
    return this.http.post(API_URL+'removeUserPlant', {uniqueID})
  }

}