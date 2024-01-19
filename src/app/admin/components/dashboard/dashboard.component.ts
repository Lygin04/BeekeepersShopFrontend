import { Component } from '@angular/core';
import {ProductService} from "../../../services/product/product.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(){
    this.getAllProducts();
  }

  getAllProducts(){
    this.products = [];
    this.productService.getAll().subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    });
  }
}
