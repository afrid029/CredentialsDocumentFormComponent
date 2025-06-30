import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageServ : MessageService) { }

  
  showToastError(summary: string, detail: string) {
     this.messageServ.add({ severity: 'error', summary: summary, detail: detail, life: 3000 });;


  }
}
