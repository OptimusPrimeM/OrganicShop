import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};

  constructor(categoryService: CategoryService, private productService: ProductService, private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories().valueChanges();

    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id) {

      // this.productService.get(id).valueChanges().subscribe(p => console.log(p.title));


        this.productService.get(id)
          .valueChanges()
          .pipe(
            take(1)
          )
          .subscribe(p => {
            console.log(p);
            this.product = p;
          });
    }
  }

  ngOnInit() {
  }

  save(product) {
    console.log(product);
    this.productService.create(product);
  }

}
