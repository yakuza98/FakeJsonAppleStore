import {Component, OnDestroy, OnInit} from '@angular/core';
import {product} from "../../core/constants/constants";
import {ProductsService} from "../../services/products.service";
import {Subscription} from "rxjs";
import {IProducts} from "../../core/interfaces/product";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  protected readonly product = product;
  public products!: IProducts[];
  canEdit: boolean = false;
  productsSubscription!: Subscription;
  basktet!: IProducts[];
  basketSub!: Subscription

  constructor(private productsService: ProductsService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.canEdit = true;
    this.getProducts()

      this.basketSub = this.productsService.getProductFromBasket()
        .subscribe((data) => {
          this.basktet = data;
        })
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe()
    }

    if (this.basketSub) {
      this.basketSub.unsubscribe()
    }
  }

  getProducts(): void {
    this.productsSubscription = this.productsService.getProducts()
      .subscribe((data: IProducts[]): void => {
        this.products = data;
      }, (error): void => {
        console.log("Error from getting products", error)
      })
  }

  openDialog(product? : IProducts): void {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;


    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    // прокидання дати через вікно.
    dialogRef.afterClosed().subscribe((product): void => {
      if(product) {
        if (product && product.id) {
          this.updateData(product)
        } else {
          this.postData(product)
        }
      }
    })
  }
  updateData(product: IProducts): void {
    this.productsService.updateProduct(product)
      .subscribe((data: IProducts): void => {
        this.products = this.products.map((product: IProducts) => {
          if (product.id === data.id) {
            return data
          } else {
            return product
          }
        })
      })
  }
  // метод map для оновлення масиву products, який містить всі продукти на сторінці.
  // Кожен елемент product у масиві перевіряється, чи має він той самий id, що і оновлений продукт data. Якщо так, то елемент замінюється на новий data,
  // оновлений продукт. Інакше, елемент залишається без змін.
  postData(product: IProducts): void {
    this.productsService.postProduct(product)
      .subscribe((product: IProducts): void => {
        this.products.push(product)
      })
  }

  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id)
      .subscribe((data): void  => {
        this.products.find((product: IProducts): void => {
          let idx: number = this.products.findIndex(product => product.id === id )
          if(id === product.id) {
            this.products.splice(idx,1)
          }
        })
      })
  }

  addtoBasket(product: IProducts): void {
    product.quantity = 1;
     let findItem;

     if(this.basktet.length > 0) {
      findItem = this.basktet.find((el) => el.id === product.id)
        if(findItem) {
          this.updateToBasket(findItem)
        }else {
          this.postToBasket(product)
        }
     }else this.postToBasket(product);
  }

  postToBasket(product: IProducts) {
    this.productsService.postToBasket(product)
      .subscribe((product: IProducts): void => {
        this.basktet.push(product)
      })
  }

  updateToBasket(product: IProducts) {
    product.quantity += 1;
    this.productsService.updateProductFromBasket(product)
      .subscribe(data => {})
  }
}
