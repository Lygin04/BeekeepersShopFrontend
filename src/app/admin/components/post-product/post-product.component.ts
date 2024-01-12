import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryService} from "../../../services/category/category.service";
import {ProductService} from "../../../services/product/product.service";

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent {
  productForm: FormGroup;
  listOfCategories: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private productService: ProductService,
              private categoryService: CategoryService) {}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }


  previewImage() {
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(){
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(res=>{
      this.listOfCategories = res;
    })
  }

  addProduct(){
    if(this.productForm.valid){
      const formData: FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this.productService.create(formData).subscribe((res) =>{
        if(res.id != null){
          this.snackBar.open('Продукт создан успешно.', 'Закрыть', {duration: 5000});
          this.router.navigateByUrl('/admin/dashboard')
        }
        else{
          this.snackBar.open('Не удалось создать продукт. Попробуйте снова.', 'Закрыть', {duration: 5000, panelClass: 'error-snackbar'});
        }
      });
    }
    else {
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
