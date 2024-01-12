import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import {AuthService} from "../services/auth/auth.service";
import {UserStorageService} from "../services/storage/user-storage.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }
  onSubmit(): void{
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.signin(email, password).subscribe(
      (response) => {
        if(UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard');
        }
        else if(UserStorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl('customer/dashboard');
        }
      },
      (error) => {
        this.snackBar.open('Не удалось войти в аккаунт. Попробуйте снова.', 'Закрыть', {duration: 5000, panelClass: 'error-snackbar'});
      });
  }
}
