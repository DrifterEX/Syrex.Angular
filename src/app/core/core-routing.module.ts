import { RouterModule, Routes } from "@angular/router";
import { ReminderListComponent } from "./reminder-list/reminder-list.component";
import { NgModule } from "@angular/core";
import { ReminderDetailComponent } from "./reminder-list/reminder-detail/reminder-detail.component";
import { CanDeactivateGuard } from "./guards/can-deactivate.guard";

export const CoreRoutes: Routes = [

    {
      path: 'reminder-list',
      children:[
        {
          path: '',
          component: ReminderListComponent,
        },
        {
          path: 'create',
          component: ReminderDetailComponent,
          canDeactivate: [CanDeactivateGuard]
        },
        {
          path: ':id',
          component: ReminderDetailComponent,
          canDeactivate: [CanDeactivateGuard]
        }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(CoreRoutes)],
    exports: [RouterModule],
  })
export class CoreRoutingModule {}

