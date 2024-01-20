import { Component } from '@angular/core';
import {ProductService} from "../../../services/product/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

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
              private snackBar: MatSnackBar) {
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
      this.getAllProducts();
      if(res.body == null){
        this.snackBar.open('Товар удалён.', 'Закрыть', {duration: 5000});
      }
      else {
        this.snackBar.open('Не удалось удалить товар. Попробуйте снова.', 'Закрыть', {duration: 5000, panelClass: 'error-snackbar'});
      }
      //this.getAllProducts();
    });
  }
}
