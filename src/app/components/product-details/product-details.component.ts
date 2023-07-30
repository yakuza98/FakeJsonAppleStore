import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IProducts} from "../../core/interfaces/product";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product!: IProducts;
  productSub!: Subscription;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
   this.productSub = this.route.data.subscribe((data: Data): void => {
     this.product = data['product'];
   })
  }
}
