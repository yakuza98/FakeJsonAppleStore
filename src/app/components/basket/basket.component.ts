import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProducts} from "../../core/interfaces/product";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {

  constructor(private productsService: ProductsService) {}

  basket!: IProducts[];
  basketSub!: Subscription;

  ngOnInit(): void {
    this.basketSub = this.productsService.getProductFromBasket()
      .subscribe((data: IProducts[]): void => {
        this.basket = data;
        console.log("basket",this.basket)
      })
  }

  ngOnDestroy(): void {
    if (this.basketSub) {
      this.basketSub.unsubscribe()
    }
  }

  addQuantity(item: IProducts) {
    item.quantity += 1;
    this.productsService.updateProductFromBasket(item)
      .subscribe()
  }

  removeQuanity(item: IProducts) {
    if (item.quantity === 1) {
      this.productsService.removeProductFromBasket(item.id)
        .subscribe(() => {
          let idx = this.basket.findIndex((el) => el.id === item.id)
          this.basket.splice(idx, 1)
        })
    }else {
      item.quantity -= 1;
      this.productsService.updateProductFromBasket(item)
        .subscribe()
    }
  }
}
