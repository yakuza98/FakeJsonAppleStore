import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProducts} from "../core/interfaces/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  url: string = "http://localhost:3000/products";
  urlBasket: string = "http://localhost:3000/basket";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.url)
  }

  getProduct(id: number): Observable<IProducts> {
    return this.http.get<IProducts>(`${this.url}/${id}`);
  }

  postProduct(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(this.url, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  updateProduct(product: IProducts) {
    return this.http.put<IProducts>(`${this.url}/${product.id}`, product)
  }

  postToBasket(product: IProducts) {
    return this.http.post<IProducts>(this.urlBasket, product)
  }

  getProductFromBasket() {
    return this.http.get<IProducts[]>(this.urlBasket);
  }

  updateProductFromBasket(product: IProducts) {
    return this.http.put(`${this.urlBasket}/${product.id}`, product)
  }
  removeProductFromBasket(id: number) {
    return this.http.delete(`${this.urlBasket}/${id}`)
  }
}
