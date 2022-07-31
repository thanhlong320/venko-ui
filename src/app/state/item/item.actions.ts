import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/core/model/item';
import { Task } from 'src/app/core/model/task';

export const loadItems = createAction('[Item] Get items');

export const loadItemsSuccess = createAction(
  '[Item] Get items success',
  props<{ items: Item[] }>()
);

export const loadItemsFailure = createAction('[Item] Get items failure');

export const updateItem = createAction(
  '[Item] Update item',
  props<{ updatedItem: Item }>()
);

export const updateItemSuccess = createAction(
  '[Item] Update item success',
  props<{ updatedItem: Item }>()
);

export const addItem = createAction(
  '[Item] Create item',
  props<{ newItem: Item }>()
);

export const addItemSuccess = createAction(
  '[Item] Create item success',
  props<{ newItem: Item }>()
);

export const deleteItem = createAction(
  '[Item] Delete item',
  props<{ itemId: string }>()
);

export const deleteItemSuccess = createAction('[Item] Delete item success');

export const changeItemActive = createAction(
  '[Item] Change Item Active',
  props<{ itemId: string }>()
);
