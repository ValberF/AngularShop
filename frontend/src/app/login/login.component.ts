import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { emailLoginValidator } from '../validators/email-login.validator';
import { passwordValidator } from '../validators/password.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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

  async login() {
    const { user, password } = this.form.value;
    try {
      await this.authService.loginUser(user, password);
      alert('Logando...');
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);  // Log do erro para fins de depuração
      alert('E-mail ou senha inválidos!');
    }
  }

  async register() {
    const { user, password } = this.form.value;
    // Por padrão, vamos registrar novos usuários como 'user'
    const role = 'user';
    try {
      await this.authService.signupUser(user, password, role);
      alert('Usuário cadastrado!');
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);  // Log do erro para fins de depuração
      alert('E-mail ou senha inválidos para cadastrar!');
    }
  }
}
