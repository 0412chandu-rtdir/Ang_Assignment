import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword
    ? { passwordsMismatch: true }
    : null;
};

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-signup-component',
  standalone: true,
  styleUrl: './signup-component.css',
  templateUrl: './signup-component.html',
})
export class SignupComponent {
  readonly signupForm = new FormGroup(
    {
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      email: new FormControl('', {

        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
      
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmPassword: new FormControl('', {

        validators: [Validators.required],
      }),
    },
    { validators: passwordsMatchValidator },
  );

  submitted = false;

  constructor(private readonly router: Router) {}

  signup(): void {
    this.submitted = true;
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signupForm.getRawValue();
    localStorage.setItem('registeredUser', JSON.stringify({ name, email, password }));
    this.router.navigate(['/login']);
  }
}
