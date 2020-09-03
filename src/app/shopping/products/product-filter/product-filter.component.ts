import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  categories$;
  // tslint:disable-next-line: no-input-rename
  @Input('category') category: string;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }
}
