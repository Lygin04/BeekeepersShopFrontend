import { Component } from '@angular/core';
import {CouponService} from "../../../services/coupon/coupon.service";

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent {

  coupons:any;

  constructor(private couponService: CouponService) {
  }

  ngOnInit(){
    this.getCoupons();
  }

  getCoupons(){
    this.couponService.getAll().subscribe(res =>{
      this.coupons = res;
    })
  }
}
