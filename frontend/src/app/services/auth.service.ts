import { Injectable } from '@angular/core';
import { Database, ref, set, get, query, orderByChild, equalTo } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  providedIn: 'root',
})
export class AuthService {
  usuario = new BehaviorSubject<IUser | null>(null);

  private dbPath = '/users';
  private apiKey = 'AIzaSyAIxzvGrWNUF4DBWwklEYkKrxiWTtQVA3k';  // Replace with your Firebase API key

  constructor(private db: Database, private http: HttpClient) {}

  signupUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap(async (resData) => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const newUser: IUser = { email: resData.email, localId: resData.localId, token: resData.idToken, expirationDate };
          await this.createUserInDatabase(newUser);
          this.usuario.next(newUser);
          localStorage.setItem('userData', JSON.stringify(newUser));
        })
      );
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap(async (resData) => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const loggedInUser: IUser = { email: resData.email, localId: resData.localId, token: resData.idToken, expirationDate };
          this.usuario.next(loggedInUser);
          localStorage.setItem('userData', JSON.stringify(loggedInUser));
        })
      );
  }

  logout() {
    this.usuario.next(null);
    localStorage.removeItem('userData');
  }

  private async createUserInDatabase(user: IUser): Promise<void> {
    const userRef = ref(this.db, `${this.dbPath}/${user.localId}`);
    return set(userRef, user);
  }

  async getUserById(localId: string): Promise<IUser | null> {
    const userRef = ref(this.db, `${this.dbPath}/${localId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val() as IUser;
    } else {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const userQuery = query(ref(this.db, this.dbPath), orderByChild('email'), equalTo(email));
    const snapshot = await get(userQuery);
    if (snapshot.exists()) {
      const users = snapshot.val();
      const userKey = Object.keys(users)[0];
      return users[userKey] as IUser;
    } else {
      return null;
    }
  }
}
