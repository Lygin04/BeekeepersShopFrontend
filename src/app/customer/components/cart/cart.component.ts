import { Component } from '@angular/core';
import {CartService} from "../../../services/cart/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems:any[] = [];
  order:any;

  constructor(private cartService: CartService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              public dialog: MatDialog) {
  }

  ngOnInit(){
    this.getCart();
  }

  getCart(){
    this.cartItems = [];
    this.cartService.getCartByUserId().subscribe(res =>{
      this.order = res;
      res.cartItems.forEach(element =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cartItems.push(element);
      })
    })
  }
}
