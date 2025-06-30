import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { PrimeInputComponent } from '../../prime-input/prime-input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeFilterDropdownComponent } from '../../prime-filter-dropdown/prime-filter-dropdown/prime-filter-dropdown.component';
import { PrimeDropdownComponent } from '../../prime-dropdown/prime-dropdown.component';
import { PrimeDatepickerComponent } from '../../prime-datepicker/prime-datepicker/prime-datepicker.component';
import { ButtonComponent } from '../../prime-button/button/button.component';
import { GetDataService } from '../../Services/get-data.service';
import { DataLoaderComponent } from '../../data-loader/data-loader.component';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { ToastService } from '../../Services/toast.service';
import { GreaterThanDateValidator } from '../../Validators/GreaterThanDate.validator';
import { NotGreaterThanToday } from '../../Validators/NotGreaterThanToday.validator';
import { CharectorLimit } from '../../Validators/CharectorLimit.validator';
import { AwardedDateWithExpiryDate } from '../../Validators/AwardedDateWithExpiryDate.validator';

@Component({
  selector: 'app-reactive-form',
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    PrimeInputComponent,
    ReactiveFormsModule,
    PrimeFilterDropdownComponent,
    PrimeDatepickerComponent,
    ButtonComponent,
    DataLoaderComponent,
    Toast,
    ToastModule,
  ],

  providers: [],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent implements OnInit, AfterViewInit, OnDestroy {
  dynamicForm: FormGroup | undefined;
  disable = signal<boolean>(false);
  loading = signal<boolean>(false);
  dataLoaded = signal<boolean>(true);

  degreeType = signal<Record<string, string>[]>([
    { type: 'Doctoral' },
    { type: 'Master' },
    { type: 'Bachelor' },
    { type: 'Diploma' },
  ]);

  studyMode = signal<Record<string, string>[]>([
    { type: 'On-campus' },
    { type: 'Online' },
    { type: 'Distance Learning' },
  ]);

  countries = signal<Record<string, string>[]>([
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
  ]);

  completionOptions = signal<Record<string, string>[]>([
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' },
  ]);
  minDate = signal<Date | undefined>(undefined);

  @Input() visible: boolean = true;
  @Input() editData: any = {};
  @Output() onClose = new EventEmitter();
  @Output() onCreate = new EventEmitter();
  @Output() onUpdate = new EventEmitter();

    customErrors : Record<string,string[]> = {};

  constructor(
    private fb: FormBuilder,
    private dataServ: GetDataService,
    private toastServ: ToastService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate.set(
      new Date(today.getFullYear() - 10, today.getMonth(), today.getDate())
    );

    const dob = new Date(2012, 4, 24);
    this.dynamicForm = this.fb.group({
      institution : new FormControl('',[Validators.required, CharectorLimit]),
      certification : new FormControl('', [Validators.required, CharectorLimit]),
      country: new FormControl('', [Validators.required]),
      city : new FormControl('', [Validators.required, CharectorLimit]),
      awardeddate : new FormControl('', [Validators.required, GreaterThanDateValidator(dob), NotGreaterThanToday]),
      expirydate : new FormControl('',[GreaterThanDateValidator(dob)])
    },{
      validators : [AwardedDateWithExpiryDate]
    });
    
    this.loadCustomValidators();

    // this.getAllCountry();
  }

  loadCustomValidators() {
    this.customErrors['expirydate'] = ['AwardedDateWithExpiryDate']
    if (this.dynamicForm) {
    //  this.dynamicForm.get('awardeddate')?.valueChanges.subscribe(() => {
    //   this.dynamicForm?.get('expirydate')?.touched
    //     ? this.dynamicForm?.get('expirydate')?.updateValueAndValidity()
    //     :'';
    //  })
    }
  }

  ngAfterViewInit(): void {
    // console.log(this.editData);
    if (this.editData && this.editData.Id) {
      this.dataLoaded.set(false);

      setTimeout(() => {
        this.dynamicForm?.patchValue(this.editData);
        // this.dynamicForm?.get('dob')?.updateValueAndValidity();
        this.loadCustomValidators();
        this.dynamicForm?.markAllAsTouched();
        this.dynamicForm?.updateValueAndValidity();
        this.dataLoaded.set(true);
      }, 3000);
    }
  }
  ngOnDestroy(): void {
    this.editData = {};
  }
  getAllCountry() {
    this.dataServ.getCountry().subscribe((data) => {
      this.countries.set(data);
    });
  }

  onSubmit() {
    this.loading.set(true);
    console.log(this.dynamicForm?.value);

    if (this.dynamicForm?.invalid) {
      this.toastServ.showToastError(
        'Invalid',
        'There are validation issues in your submission. Please review the form and try again.'
      );

      this.loading.set(false);
    }else {
     this.editData && this.editData.Id 
     ? this.onUpdate.emit(this.dynamicForm?.value)
     : this.onCreate.emit(this.dynamicForm?.value);
      this.onHide();
    }
  }

  onHide() {
    this.onClose.emit();
  }
}
