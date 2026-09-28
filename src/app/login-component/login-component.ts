import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login-component',
  standalone: true,
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  readonly loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
  submitted = false;
  loginError = '';

  constructor(private router: Router, private dashboardService: DashboardService) {}

  login(): void {
    this.submitted = true;
    this.loginError = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();
    const registeredUser = localStorage.getItem('registeredUser');
    if (registeredUser) {
      const user = JSON.parse(registeredUser) as { email: string; password: string };
      if (user.email !== username || user.password !== password) {
        this.loginError = 'The email or password is incorrect.';
        return;
      }
    }

    const token = this.dashboardService.randomNumber();
    localStorage.setItem('accesstoken', token);
    this.router.navigate(['/dashboard']);
  }

}
