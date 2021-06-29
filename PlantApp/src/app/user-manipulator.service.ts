import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { JwtInterceptor } from './jwt.interceptor'


const API_URL = 'http://192.168.1.2:1337/api/'

@Injectable({
  providedIn: 'root'
})
export class UserManipulatorService {


  constructor(
    private interceptor: JwtInterceptor,
    private http: HttpClient
  ) { }

  createUser(username:string, password:string ) {
    return this.http.post<User>(API_URL+'createUser', {username, password})
  }

  DeleteUser(username:string, password:string, token:string | null) {
    return this.http.post<User>(API_URL+'deleteUser', {username, password, token})
  }

  editUsername(username:string, password:string, token:string | null) {
    return this.http.post<User>(API_URL+'editUsername', {username, password, token})
  }

  editPassword(password:string, newPassword:string, token:string | null) {
    return this.http.post(API_URL+'editPassword', {password, newPassword, token})
  }
}

interface User {
    name:String,
    password:String
}