import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryService} from "../../../services/category/category.service";

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent {

  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private categoryService: CategoryService) { }

  ngOnInit(){
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  addCategory(): void{
    if(this.categoryForm.valid){
      this.categoryService.create(this.categoryForm.value).subscribe((res) => {
        if(res.id != null){
          this.snackBar.open('Категория создана успешно.', 'Закрыть', {duration: 5000});
          this.router.navigateByUrl('/admin/dashboard')
        }
        else {
          this.snackBar.open('Не удалось создать категорию. Попробуйте снова.', 'Закрыть', {duration: 5000, panelClass: 'error-snackbar'});
        }
      })
    }
    else {
      this.categoryForm.markAllAsTouched()
    }
  }
}
