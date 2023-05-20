import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionModel } from '../model/option.model';
import { EnumToKeyValueHelper } from '../helpers/enum-to-key-value.helper';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReminderListService } from '../../services/reminder-list.service';
import { ReminderList } from '../model/reminder-list.model';

@UntilDestroy()
@Component({
  selector: 'app-reminder-detail',
  templateUrl: './reminder-detail.component.html',
  styleUrls: ['./reminder-detail.component.scss']
})
export class ReminderDetailComponent implements OnInit {
  public reminderDetailsForm: FormGroup;
  public statusOptions: OptionModel[] = [];

  private reminderId: string = '';
  private isCreateMode: boolean = true;
  
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reminderListService: ReminderListService) {
    this.reminderId = this.activatedRoute.snapshot.paramMap.get('id') as unknown as string;
    this.isCreateMode = !this.reminderId;

    this.reminderDetailsForm = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      description: '',
      reminderDate: ['', Validators.required],
      status: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.initializeStatusFilter();
    if (!this.isCreateMode) {
      this.reminderListService
      .getReminderListById(this.reminderId)
      .pipe(untilDestroyed(this))
      .subscribe((data: ReminderList) => {
        data.id = this.reminderId;
        data.reminderDate = this.toIsoStringNoOffset(new Date(data.reminderDate));
        this.reminderDetailsForm.patchValue(data);
      });
    }
  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.reminderDetailsForm.dirty) {
      return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }

  submitForm() {
    if (this.reminderDetailsForm.valid) {
      if (this.isCreateMode) {
        this.reminderListService.createReminderList(this.reminderDetailsForm.value)
        .pipe(untilDestroyed(this))
        .subscribe((data: number) => {
          this.reminderDetailsForm.markAsPristine();
          this.router.navigate(['/core/reminder-list']);
        });
      } else {
        this.reminderListService.updateReminderList(this.reminderDetailsForm.value)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.reminderDetailsForm.markAsPristine();
          this.router.navigate(['/core/reminder-list']);
        });
      }
    }
  }

  onBackClick() {
    this.router.navigate(['/core/reminder-list']);
  }

  initializeStatusFilter() {
    this.statusOptions = EnumToKeyValueHelper.getReminderListStatusEnumAsObjectList(false);
  }

  private toIsoStringNoOffset(date: Date) {
    var tzo = -date.getTimezoneOffset(),
        pad = function(num: number) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds());
  }
}
