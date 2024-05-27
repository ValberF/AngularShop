import { Injectable } from '@angular/core';
import { Database, ref, set, push, child, get } from '@angular/fire/database';
import { IProduct } from '../models/product.model';

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
    const snapshot = await get(child(productRef, ''));
    if (snapshot.exists()) {
      return Object.values(snapshot.val()) as IProduct[];
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
}
