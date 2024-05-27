// login.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { emailLoginValidator } from '../validators/email-login.validator';
import { passwordValidator } from '../validators/password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormControl(null, [Validators.required, emailLoginValidator()]),
      password: new FormControl(null, [Validators.required, passwordValidator()]),
    });
  }

  login() {
    this.authService.loginUser(this.form.value.user, this.form.value.password).subscribe({
      next: () => {
        alert('Logando...');
        this.router.navigate(['/']);
      },
      error: () => {
        alert('E-mail ou senha inválidos!');
      },
    });
  }

  register() {
    this.authService.signupUser(this.form.value.user, this.form.value.password).subscribe({
      next: () => {
        alert('Usuário cadastrado!');
        this.router.navigate(['/']);
      },
      error: () => {
        alert('E-mail ou senha inválidos para cadastrar!');
      },
    });
  }
}
