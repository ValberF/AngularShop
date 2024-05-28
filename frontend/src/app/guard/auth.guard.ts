import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.usuario.pipe(
      map(user => {
        if (user && user.role === 'admin') {
          return true;
        } else {
          alert("Autorizado apenas para admin!");
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
