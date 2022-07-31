import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { MenuComponent } from './menu.component';
import { DescriptionComponent } from './description/description.component';

const menuRoutes: Routes = [
  { path: '', component: DescriptionComponent },
  { path: ':id', component: ItemDetailsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(menuRoutes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
