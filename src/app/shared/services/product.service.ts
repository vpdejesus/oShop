import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList: AngularFireList<Product>;

  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db
      .list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => ({ key: a.payload.key, ...a.payload.val() }))
        )
      );
  }

  get(productId): Observable<Product> {
    return this.db
      .object<Product>('/products/' + productId)
      .valueChanges()
      .pipe(take(1));
  }

  update(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  delete(id: string): Promise<void> {
    if (this.productList == null) {
      this.db.database.ref('/products/' + id).remove();
    } else {
      return this.productList.remove(id);
    }
  }
}
