import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Product } from "./shared/product.model";
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map((products: Product[]) => products.find(p => p.productId === id))
    )
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // getProducts(): Product[] {
  //   return [
  //     {
  //       "productId": 1,
  //       "productName": "Leaf Rake",
  //       "productCode": "GDN-0011",
  //       "releaseDate": "March 19, 2021",
  //       "description": "Leaf rake with 48-inch wooden handle.",
  //       "price": 19.95,
  //       "starRating": 3.2,
  //       "imageUrl": "assets/images/leaf_rake.png"
  //     },
  //     {
  //       "productId": 2,
  //       "productName": "Garden Cart",
  //       "productCode": "GDN-0023",
  //       "releaseDate": "March 18, 2021",
  //       "description": "15 gallon capacity rolling garden cart",
  //       "price": 32.99,
  //       "starRating": 4.2,
  //       "imageUrl": "assets/images/garden_cart.png"
  //     },
  //     {
  //       "productId": 5,
  //       "productName": "Hammer",
  //       "productCode": "TBX-0048",
  //       "releaseDate": "May 21, 2021",
  //       "description": "Curved claw steel hammer",
  //       "price": 8.9,
  //       "starRating": 4.8,
  //       "imageUrl": "assets/images/hammer.png"
  //     },
  //     {
  //       "productId": 8,
  //       "productName": "Saw",
  //       "productCode": "TBX-0022",
  //       "releaseDate": "May 15, 2021",
  //       "description": "15-inch steel blade hand saw",
  //       "price": 11.55,
  //       "starRating": 3.7,
  //       "imageUrl": "assets/images/saw.png"
  //     },
  //   ];
  // }
}
