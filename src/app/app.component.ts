import { Component, OnInit, ViewChild, ViewContainerRef, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormComponent } from './Components/reactive-form/reactive-form.component';
import { CommonModule } from '@angular/common';
import { GetDataService } from './Services/get-data.service';
import { DataViewModule } from 'primeng/dataview';
import { ToastModule, ToastPositionType } from 'primeng/toast';
import { DynamicFormService } from './Services/dynamic-form.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, CommonModule, DataViewModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FormComponent';
  visible = signal<boolean>(false);
  users = signal<any[]>([]);
  filteredData = signal<any>({});
  editId : number | undefined;
  toastPosition : ToastPositionType = 'top-right';

  @ViewChild('conatiner', {read: ViewContainerRef, static: true})
  container! : ViewContainerRef;

  private _dataServ : GetDataService = inject(GetDataService);
  private _dynamicForm : DynamicFormService =  inject(DynamicFormService);
  private _ref : DynamicDialogRef = inject(DynamicDialogRef);

ngOnInit(): void {
   this.toastPosition = window.innerWidth <= 600 ? 'top-center' : 'top-right';
  this.users.set(this._dataServ.getData());
}
  OpenModel(){
    this._ref = this._dynamicForm.CreateDynamicForm('Credentials Document');
    this._ref.onClose.subscribe(data => {
      data ? this.onCreate(data) : '';
    });

  }


  showDialog(Id:number) {
    this.editId = Id;
  const fetched = this.users().filter((p: any) => p.Id == Id)
    this.filteredData.set(fetched[0]);
    
    this._ref = this._dynamicForm.UpdateDynamicForm('Credentials Document', this.filteredData);
    this._ref.onClose.subscribe(data => {
      data ? this.onUpdate(data) : '';
    })
    
  }

   
    onCreate(data: any) {
      console.log(data);
      const Id = this.users().length + 1;
      const newData = { Id: Id, ...data };
      this.users.update((current) => [newData, ...current]);
    }
  
    onUpdate(data: any) {
      this.users.update((user) =>
        user.map((us) =>
          us.Id === this.editId ? { Id: this.editId, ...data } : us
        )
      );

    
      
    }

}
