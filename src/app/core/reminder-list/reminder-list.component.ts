import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ReminderList } from './model/reminder-list.model';
import { ReminderListStatusEnum } from './enums/reminder-list-status.enum';
import { OptionModel } from './model/option.model';
import { EnumToKeyValueHelper } from './helpers/enum-to-key-value.helper';
import { Router } from '@angular/router';
import { ReminderListService } from '../services/reminder-list.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'description', 'reminderDate', 'status', 'action'];
  public dataSource: MatTableDataSource<ReminderList> = new MatTableDataSource<ReminderList>([]);
  public statusOptions: OptionModel[] = [];

  private filterValues: any = {};

  @ViewChild(MatSort) sort: MatSort | undefined;
  
  

  constructor(private router: Router,
    private reminderListService: ReminderListService) {
  }

  ngOnInit(): void {
    this.initializeStatusFilter();
    this.loadDataSource();
  }

  initializeStatusFilter() {
    this.statusOptions = EnumToKeyValueHelper.getReminderListStatusEnumAsObjectList();
  }

  displayReminderListStatus(status: number) {
    return ReminderListStatusEnum[status];
  }

  createFilter() {
    let customFilterFunction = function (data: any, filter: string): boolean {
      let searchCriteria = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchCriteria) {
        if (searchCriteria[col].toString() !== '' && searchCriteria[col].toString() !== '0') {
          isFilterSet = true;
        } else {
          delete searchCriteria[col];
        }
      }

      let queryMatching = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchCriteria) {
            searchCriteria[col].trim().toLowerCase().split(' ').forEach((value: any) => {
              if (data[col].toString().toLowerCase().indexOf(value) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return queryMatching()
    }
    return customFilterFunction
  }

  applyFilter(obj: any, column: string) {
    const stringFilters: string[] = ['id', 'name', 'description'];
    if (stringFilters.includes(column) ) {
      this.filterValues[column] = obj.target.value.trim().toLowerCase()
      this.dataSource.filter = JSON.stringify(this.filterValues)
    } else if (column === 'status'){
      this.filterValues[column] = obj.value.toString().trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(this.filterValues)
    } else if (column === 'reminderDate') {
      this.filterValues[column] = obj.target.value ? (new Date(obj.target.value)).toISOString().trim().toLowerCase() : '';
      this.dataSource.filter = JSON.stringify(this.filterValues)
    }
  }

  onCreate() {
    this.router.navigate(['/core/reminder-list/create']);
  }

  onEdit(e: ReminderList) {
    this.router.navigate([`/core/reminder-list/${e.id}`]);
  }

  onDelete(e: ReminderList) {
    this.reminderListService.deleteReminderList(e.id)
    .pipe(untilDestroyed(this))
    .subscribe(() => {
      this.loadDataSource();
    });
  }

  private loadDataSource() {
    this.reminderListService.getReminderList()
      .pipe(untilDestroyed(this))
      .subscribe((data: ReminderList[]) => {
        data.forEach((e: ReminderList) => {
          e.reminderDate = (new Date(e.reminderDate)).toISOString();
        });
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.filterPredicate = this.createFilter();
      });
  }

}
