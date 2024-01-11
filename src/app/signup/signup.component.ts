import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;
  selected: any;
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void{
    this.signupForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      //confirmPassword: [null, [Validators.required]],
      role: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void{
    /*const password = this.signupForm.get('password')!.value;
    const confirmPassword = this.signupForm.get('confirmPassword')!.value;

    if(password != confirmPassword){
      this.snackBar.open('Пароли не совпадают.', 'Закрыть', {duration: 5000, panelClass: 'error-snackbar'});
      return;
    }

    this.signupForm.removeControl('confirmPassword');*/
    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        this.snackBar.open('Вы зарегистрированы.', 'Закрыть', {duration: 5000});
        this.router.navigateByUrl("/signin")
      },
      (error) => {
        this.snackBar.open('Не удалось зарегистировать пользователя. Попробуйте снова.', 'Закрыть', {duration: 5000, panelClass: 'error-snackbar'});
      });
  }
}
