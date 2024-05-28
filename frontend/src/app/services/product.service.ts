import { Injectable } from '@angular/core';
import { Database, ref, set, push, child, get } from '@angular/fire/database';
import { IProduct } from '../models/product.model';
import { Observable, from, map } from 'rxjs';
import { ICart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dbPath = '/products';

  constructor(private db: Database) {}

  async createProduct(product: IProduct): Promise<void> {
    const productRef = ref(this.db, this.dbPath);
    const newProductRef = push(productRef);
    return set(newProductRef, product);
  }

  async getProducts(): Promise<IProduct[]> {
    const productRef = ref(this.db, this.dbPath);
    const snapshot = await get(productRef);
    if (snapshot.exists()) {
      const products: any = [];
      snapshot.forEach((childSnapshot) => {
        products.push({ key: childSnapshot.key, ...childSnapshot.val() });
      });
      return products;
    } else {
      return [];
    }
  }

  async getProduct(id: string): Promise<IProduct | null> {
    const productRef = ref(this.db, `${this.dbPath}/${id}`);
    const snapshot = await get(productRef);
    if (snapshot.exists()) {
      return snapshot.val() as IProduct;
    } else {
      return null;
    }
  }

  async updateProduct(id: string, product: IProduct): Promise<void> {
    const productRef = ref(this.db, `${this.dbPath}/${id}`);
    return set(productRef, product);
  }

  async deleteProduct(id: string): Promise<void> {
    const productRef = ref(this.db, `${this.dbPath}/${id}`);
    return set(productRef, null);
  }
  checkCodeExists(code: number): Observable<boolean> {
    return from(this.getProducts()).pipe(
      map((products) => products.some((product) => product.code === code))
    );
  }

  checkNameExists(name: string): Observable<boolean> {
    return from(this.getProducts()).pipe(
      map((products) => products.some((product) => product.name === name))
    );
  }
}
