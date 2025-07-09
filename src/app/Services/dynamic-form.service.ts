import { inject, Injectable, signal, Signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReactiveFormComponent } from '../Components/reactive-form/reactive-form.component';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  private _dialogService: DialogService = inject(DialogService);

  CreateDynamicForm(header: string): DynamicDialogRef {
    return this._dialogService.open(ReactiveFormComponent, {
      closable: true,
      header: header,
    });
  }

  UpdateDynamicForm(header: string, data: Signal<any>): DynamicDialogRef {
    return this._dialogService.open(ReactiveFormComponent, {
      closable: true,
      header: header,
      data : data()
    });
  }
}
