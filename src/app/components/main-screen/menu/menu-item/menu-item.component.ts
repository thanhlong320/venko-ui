import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/core/model/item';
import { State } from 'src/app/state/app/app.state';
import * as ItemActions from '../../../../state/item/item.actions';
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.sass'],
})
export class MenuItemComponent implements OnInit {
  @Input('item') item!: Item;
  isActive: boolean = false;

  constructor(private store: Store<State>) {}
  updateItem(event: Event): void {
    let input = event.target as HTMLInputElement;
    let updatesItemName = input.value;
    let updatedItemCode = updatesItemName.toLocaleLowerCase();
    let updatedItem = {
      ...this.item,
      name: updatesItemName,
      code: updatedItemCode,
    };
    this.store.dispatch(ItemActions.updateItem({ updatedItem }));
  }
  ngOnInit(): void {}
}
