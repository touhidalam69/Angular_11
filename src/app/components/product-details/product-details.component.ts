import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  currentProduct = null;
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getProduct(this.route.snapshot.paramMap.get('ProductId'));
  }

  getProduct(ProductId): void {
    this.productService.read(ProductId)
      .subscribe(
        product => {
          this.currentProduct = product;
          console.log(product);
        },
        error => {
          console.log(error);
        });
  }


  setAvailableStatus(status): void {
    const data = {
      ProductName: this.currentProduct.ProductName,
      ProductPrice: this.currentProduct.ProductPrice,
      Description: this.currentProduct.Description,
      Status: this.currentProduct.Status
    };

    this.productService.update(this.currentProduct.ProductId, data)
      .subscribe(
        response => {
          this.currentProduct.Status = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateProduct(): void {
    this.productService.update(this.currentProduct.ProductId, this.currentProduct)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The product was updated!';
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.ProductId)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }
}
