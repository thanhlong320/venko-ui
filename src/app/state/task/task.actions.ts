import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/core/model/task';

export const addTask = createAction(
  '[Task] Create task',
  props<{ newTask: Task; itemId: string }>()
);

export const addTaskSuccess = createAction(
  '[Task] Create task success',
  props<{ newTask: Task }>()
);

export const updateTask = createAction(
  '[Task] Update task',
  props<{ updateTask: Task; itemId: string }>()
);

export const updateTaskSuccess = createAction(
  '[Task] Update task success',
  props<{ updateTask: Task }>()
);

export const deteleTask = createAction(
  '[Task] Delete task',
  props<{ taskId: string, itemId: string }>()
);

export const deteleTaskSuccess = createAction(
  '[Task] Delete task success',
);
