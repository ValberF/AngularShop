import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { emailLoginValidator } from '../validators/email-login.validator';
import { passwordValidator } from '../validators/password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'user': new FormControl(null, [Validators.required, emailLoginValidator()]),
      'password': new FormControl(null, [Validators.required, passwordValidator()]),
    });
  }

  login() {
    this.authService.loginUser(this.form.value.user, this.form.value.password).subscribe({
      next: () => {
        alert("Logando...")
        this.router.navigate(['/']);
      },
      error: () => {
        alert("E-mail ou senha inválidos!")
      }
    });
  }

  register() {
    this.authService.signupUser(this.form.value.user, this.form.value.password).subscribe({
      next: () => {
        alert("Usuário cadastrado!")
        this.router.navigate(['/']);
      },
      error: () => {
        alert("E-mail ou senha inválidos para cadastrar!")
      }
    });
  }
}
