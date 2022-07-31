import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/core/model/item';
import { Task } from 'src/app/core/model/task';
import { getItems, State } from 'src/app/state/app/venko.selectors';
import * as TaskActions from '../../../../state/task/task.actions';
import * as ItemActions from '../../../../state/item/item.actions';
import { FormControl, FormGroup } from '@angular/forms';
import { Filter } from 'src/app/core/model/filter';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.sass'],
})
export class ItemDetailsComponent {
  items$ = this.store.select(getItems);
  item!: Item;
  itemId!: string;
  isHiddenPopup: boolean = true;
  newTaskName: string = '';
  newTaskDate: string = '';
  myForm! : FormGroup;

  status = [
    {value: 'ALL', content: 'All'},
    {value: 'DONE', content: 'Done'},
    {value: 'DOING', content: 'Doing'},
  ];

  ngOnInit(){
    this.myForm = new FormGroup({
      'filter-date': new FormControl((new Date()).toISOString().substring(0,10)),
      'filter-status': new FormControl(this.status[0].value)
    });
  }

  getAllItems(): void {
    this.store.dispatch(ItemActions.loadItems());
  }

  constructor(private route: ActivatedRoute, private store: Store<State>) {
    route.params.subscribe((val) => {
      this.itemId = this.route.snapshot.params['id'];
      this.getItem(this.itemId);
    });
  }

  filter(): void{
    let date = this.myForm.value["filter-date"]
    let status = this.myForm.value["filter-status"]
    let filter: Filter = {status, date};
    console.log(filter)
    this.store.dispatch(ItemActions.filter({filter}));
  }

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

  getItem(itemId: string) {
    this.items$.subscribe(
      (items) => (this.item = items.find((item) => item.id == itemId) as Item)
    );
  }

  changePopupState(): void {
    this.isHiddenPopup = !this.isHiddenPopup;
    this.newTaskDate = '';
    this.newTaskName = '';
  }

  changeIsDoneState(task: Task): void {
    let updateTask: Task = {
      ...task,
      isDone: !task.isDone,
    };
    let itemId = this.itemId;
    this.store.dispatch(TaskActions.updateTask({ updateTask, itemId }));
  }

  createNewTask(): void {
    let newTask: Task = {
      title: this.newTaskName,
      date: this.newTaskDate,
      isDone: false,
    } as Task;
    let itemId = this.itemId;
    this.store.dispatch(TaskActions.addTask({ newTask, itemId }));
    this.changePopupState();
  }

  deleteTask(task: Task): void {
    let taskId = task.id;
    let itemId = this.item.id;
    this.store.dispatch(TaskActions.deteleTask({ taskId, itemId }));
  }

  deleteItem(item: Item): void {
    let itemId = item.id;
    this.store.dispatch(ItemActions.deleteItem({ itemId }));
  }

  updateTaskDate(task: Task, event: Event): void {
    let input = event.target as HTMLInputElement;
    let date = input.value;
    let updateTask: Task = {
      ...task,
      date: date,
    };
    let itemId = this.itemId;
    this.store.dispatch(TaskActions.updateTask({ updateTask, itemId }));
  }

  updateTaskTitle(task: Task, event: Event): void {
    let input = event.target as HTMLInputElement;
    let title = input.value;
    let updateTask: Task = {
      ...task,
      title: title,
    };
    let itemId = this.itemId;
    this.store.dispatch(TaskActions.updateTask({ updateTask, itemId }));
  }
}
