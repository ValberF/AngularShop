export interface IUser {
  email: string;
  localId: string;
  token: string;
  expirationDate: Date;
}

export class User implements IUser {
  constructor(
    public email: string,
    public localId: string, // Corrigido para localId
    public token: string,
    public expirationDate: Date // Corrigido para expirationDate
  ) {}

  get validToken() {
    if (!this.expirationDate || new Date() > this.expirationDate) {
      return null;
    }
    return this.token;
  }
}
