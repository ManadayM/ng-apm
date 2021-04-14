import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;

  filteredProducts: Product[] = [];

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    console.log('In setter: ', value);
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  products: Product[] = [];
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log('Product list initialized.');
    // this.listFilter = 'cart';
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(_filterBy: string): Product[] {
    const filterBy = _filterBy.toLowerCase();
    return this.products.filter((product: Product) => {
      return product.productName.toLowerCase().includes(filterBy);
    })
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
