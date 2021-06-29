import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { UserManipulatorService } from '../user-manipulator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  registerForm = this.formBuilder.group({
    username: '',
    password: ''
  });


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userManipulator: UserManipulatorService,
    private router: Router

    ) {}

  onSubmit(): void {
    const login = this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
    login.subscribe(navigate => {
      if(navigate) {
        this.router.navigate(['/settings'])
      }
    });
  }

  onSubmitRegister(): void {
    const register = this.userManipulator.createUser(this.registerForm.value.username, this.registerForm.value.password);
    register.subscribe()
  }
}