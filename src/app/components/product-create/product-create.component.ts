import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product = {
      ProductName: '',
      ProductPrice: '',
      Description: '',
      Status: ''
  };
  submitted = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    const data = {
      ProductName: this.product.ProductName,
      ProductPrice: this.product.ProductPrice,
      Description: this.product.Description,
      Status: this.product.Status
    };

    this.productService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      ProductName: '',
      ProductPrice: '',
      Description: '',
      Status: ''
    };
  }
}
