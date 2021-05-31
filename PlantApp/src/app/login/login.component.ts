import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

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

  TestForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  GetTestForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService
    ) {}

  onSubmit(): void {
    this.AuthService.login(this.loginForm.value.username, this.loginForm.value.password);
  }

  onSubmitTest(): void {
    this.AuthService.loginTest("test", "test");
  }

  onGetTest(): void {
    this.AuthService.getTest;
  }

}
