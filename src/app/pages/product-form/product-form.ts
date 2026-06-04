import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  productForm = this.fb.group({
    title: ['', Validators.required],
    price: [0, Validators.required],
    category: ['', Validators.required],
  });

  editingProductId: number | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.editingProductId = Number(id);

    this.productService.getProduct(this.editingProductId).subscribe((product) => {
      this.productForm.patchValue({
        title: product.title,
        price: product.price,
        category: product.category,
      });

      if (this.productService.products().length === 0) {
        this.productService.getProducts().subscribe((response) => {
          this.productService.setProducts(response.products);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const formValue = this.productForm.getRawValue();

    if (this.editingProductId) {
      this.productService.updateProduct({
        id: this.editingProductId,
        title: formValue.title ?? '',
        description: '',
        price: formValue.price ?? 0,
        category: formValue.category ?? '',
        thumbnail: '',
        images: [],
        rating: 0,
        stock: 0,
      });
    } else {
      this.productService.addProduct({
        id: Date.now(),
        title: formValue.title ?? '',
        description: '',
        price: formValue.price ?? 0,
        category: formValue.category ?? '',
        thumbnail: '',
        images: [],
        rating: 0,
        stock: 0,
      });
    }

    this.router.navigate(['/product-management']);
  }
}
