import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private itemURL = 'http://localhost:8080/api/items';
  private auth_token = localStorage.getItem("token");

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${this.auth_token}`
    })
  };
  constructor(private http: HttpClient) {}

  addTask(task: Task, itemId: string): Observable<Task> {
    return this.http.post<Task>(this.itemURL + `/${itemId}/tasks`, task, this.httpOptions);
  }

  updateTask(task: Task, itemId: string): Observable<Task> {
    return this.http.put<Task>(
      this.itemURL + `/${itemId}/tasks/${task.id}`,
      task, this.httpOptions
    );
  }

  deleteTask(taskId: string, itemId: string): Observable<void> {
    return this.http.delete<void>(this.itemURL + `/${itemId}/tasks/${taskId}`, this.httpOptions);
  }
}
