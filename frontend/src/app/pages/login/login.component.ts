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
import { AuthService } from '../../services/auth.service';
import { emailLoginValidator } from '../../validators/email-login.validator';
import { passwordValidator } from '../../validators/password.validator';

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
    //private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormControl(null, [Validators.required, emailLoginValidator()]),
      password: new FormControl(null, [Validators.required, passwordValidator()]),
    });
  }

  login() {
    /*if (this.form.invalid) {
      return;
    }
    this.authService.loginUser(this.form.value.user, this.form.value.password).subscribe({
      next: () => {
        alert('Login bem-sucedido!');
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Falha no login!');
      }
    });*/
  }

  register() {
    /*if (this.form.invalid) {
      return;
    }
    this.authService.signupUser(this.form.value.user, this.form.value.password).subscribe({
      next: () => {
        alert('Cadastro bem-sucedido!');
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Falha no cadastro!');
      }
    });*/
  }
}
