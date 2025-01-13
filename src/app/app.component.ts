import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Product Manager';

  products: any[] = [];
  newProduct = { id: null, name: '', category: '', description: '', price: null };

  constructor(private translate: TranslateService, private baseService: BaseService) {
    // Set default language to English
    this.translate.addLangs(['en','hu']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  // Switch between languages
  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.baseService.getProducts().subscribe((data: any) => {
      this.products = data
        ? Object.entries(data).map(([key, value]: any) => ({ ...value, id: key }))
        : [];
    });
  }

  addProduct() {
    this.baseService.createProducts(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = { id: null, name: '', category: '', description: '', price: null };
    });
  }

  updateProduct(product: any) {
    product.price = parseFloat(product.price).toFixed(2);
    this.baseService.updateProducts(product).subscribe(() => this.loadProducts());
  }

  deleteProduct(id: string) {
    this.baseService.deleteProducts(id).subscribe(() => this.loadProducts());
  }
}
