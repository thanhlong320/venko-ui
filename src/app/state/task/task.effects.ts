import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { Task } from 'src/app/core/model/task';
import { TaskService } from 'src/app/core/service/task.service';
import * as TaskActions from './task.actions';
@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap((action) =>
        this.taskService.addTask(action.newTask, action.itemId).pipe(
          map((newTask: Task) => {
            return TaskActions.addTaskSuccess({ newTask });
          })
        )
      )
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap((action) =>
        this.taskService.updateTask(action.updateTask, action.itemId).pipe(
          map((updateTask: Task) => {
            return TaskActions.updateTaskSuccess({ updateTask });
          })
        )
      )
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.deteleTask),
      mergeMap((action) =>
        this.taskService.deleteTask(action.taskId, action.itemId).pipe(
          map(() => {
            return TaskActions.deteleTaskSuccess();
          })
        )
      )
    );
  });
}
