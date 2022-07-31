import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app/app.state';
import { getIsLogged } from 'src/app/state/app/venko.selectors';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.sass']
})
export class DescriptionComponent implements OnInit {
  isLogged$ = this.store.select(getIsLogged);
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  }

}
