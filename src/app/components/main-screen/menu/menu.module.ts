import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { MenuRoutingModule } from './menu-routing.module';
import { DescriptionComponent } from './description/description.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MenuComponent,
    ItemDetailsComponent,
    DescriptionComponent,
    MenuItemComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule
  ],
  exports: [
    MenuComponent,
    ItemDetailsComponent
  ]
})
export class MenuModule { }
