import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, SubscriptionLike } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category, Item, ItemsResponse } from '../../core/types/types';
import { ApiService } from '../../core/services/api.service';
import { CategoryService } from '../../core/services/category.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class ItemComponent implements OnInit, OnDestroy {
  public item: Item;
  public categoryName = '';
  public loadingError = new Subject<boolean>();
  private categoriesSub: SubscriptionLike;
  private itemsSubs: SubscriptionLike[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.params.name;
    this.categoriesSub = this.categoryService.categories.pipe(
      catchError((error) => {
        console.error('Error loading categories and items', error);
        return of(error);
      })
    ).subscribe((categories: Category[]) => {
      if (!Array.isArray(categories)) {
        this.item = null;
        return;
      } else {
        categories.forEach(category => this.itemsSubs.push(this.apiService.getItems(category.id, 0, 0)
          .subscribe((items: ItemsResponse) => {
            items.data.forEach(item => {
              if (item.name.split(' ').join('_') === name) {
                this.item = item;
                this.categoryName = category.name;
              }
            });
          })));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
    this.itemsSubs.forEach(itemSub => {
      if (itemSub) {
        itemSub.unsubscribe();
      }
    });
  }


}
