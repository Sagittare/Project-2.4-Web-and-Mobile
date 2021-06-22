import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


const API_URL = 'http://192.168.1.2:1337/api/'

@Injectable({
  providedIn: 'root'
})
export class UserManipulatorService {


  constructor(
    private http: HttpClient
  ) { }

  createUser(name:string, password:string ) {
    return this.http.post<User>(API_URL+'createUser', {name, password})
  }

  DeleteUser(name:string, password:string ) {
    return this.http.post<User>(API_URL+'deleteUser', {name, password})
  }

  editUsername(name:string, password:string ) {
    return this.http.post<User>(API_URL+'editUsername', {name, password})
  }

  editPassword(password:string, newPassword:string ) {
    return this.http.post(API_URL+'editPassword', {password, newPassword})
  }
}

interface User {
    name:String,
    password:String,
}