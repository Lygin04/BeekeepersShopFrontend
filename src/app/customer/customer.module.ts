import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {DemoAngularMaterialModule} from "../DemoAngularMaterialModule";
import { CartComponent } from './components/cart/cart.component';



@NgModule({
  declarations: [
    CustomerComponent,
    DashboardComponent,
    CartComponent,

  ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
      FormsModule,
      MatFormFieldModule,
      HttpClientModule,
      DemoAngularMaterialModule
    ]
})
export class CustomerModule { }
