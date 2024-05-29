import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user.model';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario = new BehaviorSubject<IUser | null>(null);

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  signupUser(email: string, password: string, role: 'user' | 'admin') {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        if (user) {
          return user.getIdTokenResult().then(tokenResult => {
            const expirationDate = new Date(tokenResult.expirationTime);
            const usuario = new IUser(
              user.email || '',
              user.uid,
              tokenResult.token,
              expirationDate,
              role
            );
            this.usuario.next(usuario);
            localStorage.setItem('userData', JSON.stringify(usuario));
          });
        } else {
          return Promise.reject(new Error('User creation failed'));
        }
      });
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential: UserCredential) => {
        const user = userCredential.user;
        if (user) {
          const tokenResult = await user.getIdTokenResult();
          const expirationDate = new Date(tokenResult.expirationTime);
          let role = 'user';
          if(user.email == "admin@email.com") {
            role = 'admin';
          }
          const usuario = new IUser(
            user.email || '',
            user.uid,
            tokenResult.token,
            expirationDate,
            role
          );
          this.usuario.next(usuario);
          localStorage.setItem('userData', JSON.stringify(usuario));
        } else {
          return Promise.reject(new Error('Login failed'));
        }
      });
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.usuario.next(null);
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    });
  }

  
}
