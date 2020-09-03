import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  Component,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  subscription: Subscription;
  productList: MatTableDataSource<Product>;
  displayedColumns: string[] = ['title', 'price', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private productService: ProductService,
    private detector: ChangeDetectorRef
  ) {
    this.subscription = this.productService
      .getAll()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.productList = new MatTableDataSource(products);
        this.detector.detectChanges();

        this.productList.paginator = this.paginator;
        this.productList.sort = this.sort;
      });
  }

  public doFilter(value: string) {
    this.productList.filter = value.trim().toLocaleLowerCase();
  }

  edit(id) {
    this.router.navigate(['/admin/products/', id]);
  }

  delete(product: Product) {
    this.productService.delete(product.key);
    console.log(product.key);
    const index = this.productList.data.indexOf(product);
    this.productList.data.splice(index, 1);
    this.productList.data = this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
