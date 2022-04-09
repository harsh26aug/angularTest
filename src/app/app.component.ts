import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { MatRadioChange } from '@angular/material/radio';

interface Product {  
  id: number;
  name: string;
  color: string;
  price: number;
  addedQty: number;
}

interface Inventory {  
  productId: number;
  qty: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedView = false;
  title = 'Test';
  products: Product[] = [];
  inventories: Inventory[] = [];
  totalAmount:number = 0;

  constructor(private http: HttpClient) {
    this.products = [];
    this.getProducts().subscribe(products => {
      this.products = products;
    });

    this.inventories = [];
    this.getInventories().subscribe(inventories => {
      this.inventories = inventories;
    });
  }

  public getProducts(): Observable<any> {
    return this.http.get("./assets/products.json");
  }

  public getInventories(): Observable<any> {
    return this.http.get("./assets/inventory.json");
  }

  public onListSelected(evt: MatRadioChange){
    this.selectedView = evt.value;
  }

  public addQty(item: Product){
    let allowQty = this.inventories.find(inventory => inventory.productId == item.id)?.qty;
    if(item.addedQty != allowQty)
    {
      item.addedQty = ((item.addedQty) ? item.addedQty : 0) + 1;
      this.totalAmount += item.price;
    }
  }

  public removeQty(item: Product){
    if(item.addedQty > 0)
    {
      item.addedQty = item.addedQty - 1;
      this.totalAmount -= item.price;
    }
  }

  public totalQty(item: Product){
    return this.inventories.find(inventory => inventory.productId == item.id)?.qty;
  }
}
