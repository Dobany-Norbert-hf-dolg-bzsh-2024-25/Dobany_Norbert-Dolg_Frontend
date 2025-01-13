import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private url = 'https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.url}/.json`)
  }

  createProducts(product: any) {
    product.price = parseFloat(product.price).toFixed(2)
    return this.http.post(`${this.url}/.json`, product)
  }

  updateProducts(product: any) {
    product.price = parseFloat(product.price).toFixed(2)
    return this.http.put(`${this.url}/${product.id}.json`, product)
  }

  deleteProducts(id: string) {
    return this.http.delete(`${this.url}/${id}.json`)
  }
}