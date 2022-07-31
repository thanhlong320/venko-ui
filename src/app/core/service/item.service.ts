import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../model/item';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemURL = 'http://localhost:8080/api/items';
  private auth_token = localStorage.getItem("token");

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${this.auth_token}`
    })
  };
 
  
  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemURL, this.httpOptions);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemURL, item, this.httpOptions);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(this.itemURL, item);
  }

  deleteItem(itemId: string): Observable<void> {
    return this.http.delete<void>(this.itemURL + `/${itemId}`);
  }
}
