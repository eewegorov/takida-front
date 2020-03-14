import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  CallbackRequest,
  PostResponse,
  Category,
  CategoryResponse,
  Item,
  ItemsResponse,
  Slide,
  DetailedOrderRequest
} from '../../shared/types/types';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  itemsByCategory: Map<string, Observable<Item[]>>;

  constructor(private http: HttpClient) {
    this.itemsByCategory = new Map<string, Observable<Item[]>>();
  }

  private static handleError(error: Response) {
    console.log('Http request error: ', error);
    return throwError('HTTP Error');
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<CategoryResponse>(`${ environment.url }/categories`).pipe(
      map((response: CategoryResponse) => {
        return response.data;
      }),
      catchError(ApiService.handleError),
      shareReplay()
    );
  }

  public getItems(id: string): Observable<Item[]> {
    if (this.itemsByCategory.has(id)) {
      return this.itemsByCategory.get(id);
    } else {
      const items = this.http.get<ItemsResponse>(`${ environment.url }/categories/${ id }/goods`).pipe(
        map((response: ItemsResponse) => {
          return response.data;
        }),
        catchError(ApiService.handleError),
        shareReplay()
      );
      this.itemsByCategory.set(id, items);
      return items;
    }
  }

  public postCallBack(callData: CallbackRequest): Observable<boolean> {
    return this.http.post<PostResponse>(`${ environment.url }/booking/callbacks`, callData).pipe(
      map((response: PostResponse) => {
        return response.success;
      }),
      catchError(ApiService.handleError)
    );
  }

  public postOrder(orderData: DetailedOrderRequest): Observable<boolean> {
    return this.http.post<PostResponse>(`${ environment.url }/booking`, orderData).pipe(
      map((response: PostResponse) => {
        console.log(response);
        return response.success;
      }),
      catchError(ApiService.handleError)
    );
  }


  public getSlides(): Observable<Slide[]> {
    return this.http.get<Slide[]>('/assets/slidesStore.json').pipe(
      catchError(ApiService.handleError),
      shareReplay()
    );
  }
}
