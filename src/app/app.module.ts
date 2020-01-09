import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableSortingComponent } from './table-sorting/table-sorting.component';
import { SortableDirective } from './sortable.directive';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TableSortingComponent,
    SortableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
