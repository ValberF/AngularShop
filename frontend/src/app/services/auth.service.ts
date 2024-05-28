import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario = new BehaviorSubject<IUser>(new IUser('', '', '', new Date()));

  /*constructor(private http: HttpClient) { }*/

  signupUser(email: string, password: string) {
    /*return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApFVO_S6uB6iIaeojmNDRbF9Gl2oXZV4w',
    {
       email: email,
       password: password,
       returnSecureToken: true
    }).pipe(
       tap(resData => {
         const expiracaoData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
         const usuario = new IUser(
           resData.email,
           resData.localId,
           resData.idToken,
           expiracaoData
         );

         this.usuario.next(usuario);
         localStorage.setItem('userData', JSON.stringify(usuario));
       })
    );*/
   }

   loginUser(email: string, password: string) {
     /*return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApFVO_S6uB6iIaeojmNDRbF9Gl2oXZV4w',
     {
       email: email,
       password: password,
       returnSecureToken: true
    }).pipe(
     tap(resData => {
       const expiracaoData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
         const usuario = new IUser(
           resData.email,
           resData.localId,
           resData.idToken,
           expiracaoData
         );
         this.usuario.next(usuario);
         localStorage.setItem('userData', JSON.stringify(usuario));
     }),
    );*/
   }

   logout() {
    this.usuario.next(new IUser('', '', '', new Date()));
  }
}
