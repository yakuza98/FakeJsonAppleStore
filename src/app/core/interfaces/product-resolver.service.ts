import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {IProducts} from "./product";
import {ProductsService} from "../../services/products.service";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService  implements Resolve<IProducts | null> {
  constructor(private productsService: ProductsService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> {
    return this.productsService.getProduct(route.params['id'])
      .pipe(
        catchError((error) => {
          this.router.navigate(['products']);
          return error;
        })
      ) as Observable<IProducts>
  }
}

