import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {

  products: Object[];

  constructor(private productService: ProductService) {

    this.productService.getAll().snapshotChanges().pipe(
      map(actions =>
        actions.map(a => (
          { key: a.key, ...a.payload.val() }
        ))
      )
    ).subscribe(items => {
      return items.map(
        item => {
          // console.log(this.products);
          this.products = items;
        });
    });

  }
}
