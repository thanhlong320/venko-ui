import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { Item } from 'src/app/core/model/item';
import { Task } from 'src/app/core/model/task';
import { ItemService } from 'src/app/core/service/item.service';
import * as ItemActions from '../item/item.actions';

@Injectable()
export class ItemEffects {
  constructor(private actions$: Actions, private itemService: ItemService) {}

  getItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemActions.loadItems),
      mergeMap(() =>
        this.itemService.getItems().pipe(
          map((items: Item[]) => {
            return ItemActions.loadItemsSuccess({ items });
          })
        )
      )
    );
  });

  updateItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemActions.updateItem),
      mergeMap((action) =>
        this.itemService.updateItem(action.updatedItem).pipe(
          map((updatedItem: Item) => {
            return ItemActions.updateItemSuccess({ updatedItem });
          })
        )
      )
    );
  });

  addItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemActions.addItem),
      mergeMap((action) =>
        this.itemService.addItem(action.newItem).pipe(
          map((newItem: Item) => {
            return ItemActions.addItemSuccess({ newItem });
          })
        )
      )
    );
  });

  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemActions.deleteItem),
      mergeMap((action) =>
        this.itemService.deleteItem(action.itemId).pipe(
          map(() => {
            return ItemActions.deleteItemSuccess();
          })
        )
      )
    );
  });
}
