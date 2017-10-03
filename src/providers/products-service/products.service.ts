import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
const linkAPI = 'http://5949f15d6d49df0011102d18.mockapi.io/test/Product';
/*
  Generated class for the MainServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductService {

  constructor(private http: Http) {}
  public getProducts(): Observable<any> {
    return this.http.get(linkAPI)
    .map((response) => response.json())
    .catch(this.handlerError)
  }
  private handlerError(error) {
    return Observable.throw(error);
  }

}
