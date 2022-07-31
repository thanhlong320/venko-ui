import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/core/model/item';
import { loadItems } from 'src/app/state/item/item.actions';
import { getIsLogged, getItems, State } from 'src/app/state/app/venko.selectors';
import * as ItemActions from '../../../state/item/item.actions'
import { Task } from 'src/app/core/model/task';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  items$ = this.store.select(getItems);
  isHiddenPopup: boolean = true;
  newItemName: string = ""
  isLogged$ = this.store.select(getIsLogged);
  username: string | null = '';

  ngOnInit(): void {
    this.store.dispatch(loadItems());
    
    if(localStorage.getItem("username") != null){
      this.username = localStorage.getItem("username");
    }
  }

  constructor(private store: Store<State>) {}
  
  changePopupState(): void{
    this.isHiddenPopup = !this.isHiddenPopup;
    this.newItemName = "";    
  }

  createNewItem(): void{
    let tasks: Task[] = [];
    let newItem : Item = {
      name: this.newItemName,
      code: this.newItemName.toLocaleLowerCase(),
      tasks: tasks
    } as Item;
    this.store.dispatch(ItemActions.addItem({newItem}));
    this.changePopupState();
  }


}
