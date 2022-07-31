import { createReducer, on } from '@ngrx/store';
import { Item } from 'src/app/core/model/item';
import { Token } from 'src/app/core/model/token';
import { User } from 'src/app/core/model/user';
import * as ItemsActions from '../item/item.actions';
import * as TaskActions from '../task/task.actions';
import * as UserActions from '../user/user.actions';
export interface VenkoState {
  items: Item[];
  token: Token;
  isLogged: boolean;
}

const initState: VenkoState = {
  items: [],
  token: {} as Token,
  isLogged: false
};

export const venkoReducer = createReducer<VenkoState>(
  initState,
  on(UserActions.updateIsLogged, (state, action): VenkoState => {
    return {
      ...state,
      isLogged: action.isLogged,
    };
  }),
  on(UserActions.loginSuccess, (state, action): VenkoState => {
    localStorage.setItem('token', action.token.accessToken);
    return {
      ...state,
      token: action.token,
    };
  }),
  on(ItemsActions.loadItemsSuccess, (state, action): VenkoState => {
    return {
      ...state,
      items: action.items,
    };
  }),
  on(ItemsActions.updateItemSuccess, (state, action): VenkoState => {
    let itemsAfterUpdateItem = state.items;
    let indexUpdatedItem = 0;
    itemsAfterUpdateItem.forEach((item, index) => {
      if (item.id == action.updatedItem.id) {
        indexUpdatedItem = index;
      }
    });
    itemsAfterUpdateItem = [
      ...itemsAfterUpdateItem.slice(0, indexUpdatedItem),
      action.updatedItem,
      ...itemsAfterUpdateItem.slice(indexUpdatedItem + 1),
    ];
    return {
      ...state,
      items: itemsAfterUpdateItem,
    };
  }),
  on(ItemsActions.addItemSuccess, (state, action): VenkoState => {
    return {
      ...state,
      items: [...state.items, action.newItem],
    };
  }),
  on(ItemsActions.deleteItem, (state, action): VenkoState => {
    let indexOfItemChanged = 0;
    state.items.forEach((item, index) => {
      if (item.id == action.itemId) {
        indexOfItemChanged = index;
      }
    });
    let itemsAfterAddNewTask = state.items;
    itemsAfterAddNewTask = [
      ...itemsAfterAddNewTask.slice(0, indexOfItemChanged),
      ...itemsAfterAddNewTask.slice(indexOfItemChanged + 1),
    ];
    return {
      ...state,
      items: itemsAfterAddNewTask,
    };
  }),
  on(TaskActions.addTaskSuccess, (state, action): VenkoState => {
    let indexOfItemChanged = 0;
    state.items.forEach((item, index) => {
      if (item.id == action.newTask.itemId) {
        indexOfItemChanged = index;
      }
    });
    let itemChanged = state.items[indexOfItemChanged];
    itemChanged = {
      ...itemChanged,
      tasks: [...itemChanged.tasks, action.newTask],
    };
    let itemsAfterAddNewTask = state.items;
    itemsAfterAddNewTask = [
      ...itemsAfterAddNewTask.slice(0, indexOfItemChanged),
      itemChanged,
      ...itemsAfterAddNewTask.slice(indexOfItemChanged + 1),
    ];
    return {
      ...state,
      items: itemsAfterAddNewTask,
    };
  }),
  on(TaskActions.updateTaskSuccess, (state, action): VenkoState => {
    let indexOfItemChanged = 0;
    state.items.forEach((item, index) => {
      if (item.id == action.updateTask.itemId) {
        indexOfItemChanged = index;
      }
    });
    let itemChanged = state.items[indexOfItemChanged];
    let indexOfTaskChanged = 0;
    itemChanged.tasks.forEach((task, index) => {
      if (task.id == action.updateTask.id) {
        indexOfTaskChanged = index;
      }
    });
    itemChanged = {
      ...itemChanged,
      tasks: [
        ...itemChanged.tasks.slice(0, indexOfTaskChanged),
        action.updateTask,
        ...itemChanged.tasks.slice(indexOfTaskChanged + 1),
      ],
    };
    let itemsAfterAddNewTask = state.items;
    itemsAfterAddNewTask = [
      ...itemsAfterAddNewTask.slice(0, indexOfItemChanged),
      itemChanged,
      ...itemsAfterAddNewTask.slice(indexOfItemChanged + 1),
    ];
    return {
      ...state,
      items: itemsAfterAddNewTask,
    };
  }),
  on(TaskActions.deteleTask, (state, action): VenkoState => {
    let indexOfItemChanged = 0;
    state.items.forEach((item, index) => {
      if (item.id == action.itemId) {
        indexOfItemChanged = index;
      }
    });
    let itemChanged = state.items[indexOfItemChanged];
    let indexOfTaskChanged = 0;
    itemChanged.tasks.forEach((task, index) => {
      if (task.id == action.taskId) {
        indexOfTaskChanged = index;
      }
    });
    itemChanged = {
      ...itemChanged,
      tasks: [
        ...itemChanged.tasks.slice(0, indexOfTaskChanged),
        ...itemChanged.tasks.slice(indexOfTaskChanged + 1),
      ],
    };
    let itemsAfterAddNewTask = state.items;
    itemsAfterAddNewTask = [
      ...itemsAfterAddNewTask.slice(0, indexOfItemChanged),
      itemChanged,
      ...itemsAfterAddNewTask.slice(indexOfItemChanged + 1),
    ];
    return {
      ...state,
      items: itemsAfterAddNewTask,
    };
  })
);
