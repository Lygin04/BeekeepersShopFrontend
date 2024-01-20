import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CouponService} from "../../../services/coupon/coupon.service";

@Component({
  selector: 'app-post-coupon',
  templateUrl: './post-coupon.component.html',
  styleUrls: ['./post-coupon.component.scss']
})
export class PostCouponComponent {
  couponForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private couponService: CouponService) {
  }

  ngOnInit(){
    this.couponForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]],
    })
  }

  addCoupon(){
    if(this.couponForm.valid){
      this.couponService.create(this.couponForm.value).subscribe(res =>{
        if(res.id != null)
        {
          this.snackBar.open('Купон добавлен.', 'Закрыть', {duration: 5000});
          this.router.navigateByUrl("/admin/dashboard");
        }
        else{
          this.snackBar.open(res.message, 'Закрыть', {duration: 5000, panelClass: 'error-snackbar'});
        }
      })
    }
    else{
      this.couponForm.markAllAsTouched();
    }
  }
}
