import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../../../services/cart/cart.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private cartService: CartService) {
  }

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    })
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

  SubmitForm(){
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.productService.getAllByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    });
  }

  deleteProduct(id: any){
    this.productService.delete(id).subscribe(res =>
    {
      if(res.body == null){
        this.snackBar.open('Товар удалён.', 'Закрыть', {duration: 5000});
      }
      else {
        this.snackBar.open('Не удалось удалить товар. Попробуйте снова.', 'Закрыть', {duration: 5000, panelClass: 'error-snackbar'});
      }
      this.getAllProducts();
    });
  }

  addToCart(id:any){
    this.cartService.addToCart(id).subscribe(res =>{
      this.snackBar.open('Товар успешно добавлен в корзину.', 'Закрыть', {duration: 5000});
    });
  }
}
