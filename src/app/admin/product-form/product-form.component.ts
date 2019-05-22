import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product = {};
  id;

  constructor(categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
    this.categories$ = categoryService.getCategories().valueChanges();

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    if (this.id) {

      this.productService.get(this.id)
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



  save(product) {

    console.log(product);
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
