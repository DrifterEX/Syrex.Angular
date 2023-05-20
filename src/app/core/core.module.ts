import { NgModule } from '@angular/core';
import { ReminderListComponent } from './reminder-list/reminder-list.component';
import { CoreRoutingModule } from './core-routing.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { ReminderDetailComponent } from './reminder-list/reminder-detail/reminder-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ReminderListComponent,
    ReminderDetailComponent
  ],
  imports: [
    CoreRoutingModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule, 
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule 
  ],
  providers: [],
  bootstrap: [ReminderListComponent]
})
export class CoreModule { }