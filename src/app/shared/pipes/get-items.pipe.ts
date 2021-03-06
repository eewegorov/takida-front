import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsResponse } from '../../core/types/types';
import { ApiService } from '../../core/services/api.service';


@Pipe({
  name: 'getItems'
})
export class GetItemsPipe implements PipeTransform {
  constructor(private apiService: ApiService) { }

  transform(categoryId: string, limit: number, offset: number): Observable<ItemsResponse> {
    if (!categoryId) {
      return;
    } else {
      return this.apiService.getItems(categoryId, limit, offset);
    }
  }

}
