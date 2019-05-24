import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {


  products: Product[];
  filteredProducts: Object[];
  subscription: Subscription;

  constructor(private productService: ProductService) {

    this.subscription = this.productService.getAll().snapshotChanges().pipe(
      map(actions =>
        actions.map(a => (
          { key: a.key, ...a.payload.val() }
        ))
      )
    ).subscribe(items => {
      return items.map(
        item => {
          // console.log(this.products);
          this.filteredProducts = this.products = items;
        });
    });

  }


  filter(query: String) {
    this.filteredProducts = (query) ? this.products.filter(p => {
      return p.title.toLowerCase().includes(query.toLowerCase());
    }) : this.products;

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
