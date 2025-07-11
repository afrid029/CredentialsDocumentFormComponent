import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrimeInputComponent } from '../../prime-input/prime-input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
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
import { LengthRestriction } from '../../Validators/LengthRestriction.validator';
import { PatternMatch } from '../../Validators/PatternMatch.validator';
import { DateComparer } from '../../Validators/DateComparer.validator';
import { FormControlDateComparer } from '../../Validators/FormControlDateComparer.validator';

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
    DataLoaderComponent
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
  customValidators: ValidatorFn[] = [];
  today : Date = new Date();
  dob : Date = new Date(2012, 4, 24);

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

  editData: any = {};

  customErrors: Record<string, string[]> = {};

  private _fb : FormBuilder = inject(FormBuilder);
  private _dataServ : GetDataService = inject(GetDataService);
  private _toastServ : ToastService = inject(ToastService);
  private _config : DynamicDialogConfig = inject(DynamicDialogConfig);
  private _ref : DynamicDialogRef = inject(DynamicDialogRef);


  ngOnInit(): void {
  
    this.minDate.set(
      new Date(this.today.getFullYear() - 10, this.today.getMonth(), this.today.getDate())
    );

  
    this.dynamicForm = this._fb.group(
      {
        institution: new FormControl('', [Validators.required, 
          //  CharectorLimit,
          LengthRestriction(100,'lte','Exceeded maximum character limit')
        ]),
        certification: new FormControl('', [
          Validators.required,
          // CharectorLimit,
          LengthRestriction(100,'lte','Exceeded maximum character limit')
        ]),
        country: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required,
          //  CharectorLimit,
          PatternMatch('City only allow alphabets and spaces and no special characters.'),
          LengthRestriction(4, 'gte' ,'Invalid minimum character count'),
          LengthRestriction(100,'lte','Exceeded maximum character limit'),
          
          ]),
        awardeddate: new FormControl('', [
          Validators.required,
          // GreaterThanDateValidator(this.dob),\
          DateComparer(this.dob,'gte','Awarded date cannot be less than date of birth'),
          DateComparer(this.today,'lte','Awarded Date cannot be greater than today'),
          // NotGreaterThanToday,
        ]),
        expirydate: new FormControl('', [ DateComparer(this.dob,'gt','Expiry Date should be greater than date of birth')]),
      }
      // {
      //   validators: [AwardedDateWithExpiryDate],
      // }    
    );
     this.customValidators = [
      FormControlDateComparer('expirydate','awardeddate','gte','Expiry date should be greater than awarded date'),
      FormControlDateComparer('awardeddate','expirydate','lte','Awarded date should be less than expiry date'),
      FormControlDateComparer('awardeddate','expirydate','neq','Awarded date and expiry date should not be in the same date'),
    ]
     this.dynamicForm?.setValidators(this.customValidators);

    this.loadCustomValidators();

    // this.getAllCountry();
  }

  loadCustomValidators() {
    this.customErrors['expirydate'] = ['FormControlDateComparerGte','FormControlDateComparerNeq'];
    this.customErrors['awardeddate'] = ['FormControlDateComparerLte','FormControlDateComparerNeq'];
  }

  ngAfterViewInit(): void {
    // console.log(this.editData);
    this.editData = this._config.data;
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
    this._dataServ.getCountry().subscribe((data) => {
      this.countries.set(data);
    });
  }

  onSubmit() {
    this.loading.set(true);
    console.log(this.dynamicForm?.value);

    if (this.dynamicForm?.invalid) {
      this._toastServ.showToastError(
        'Invalid',
        'There are validation issues in your submission. Please review the form and try again.'
      );

      this.loading.set(false);
    } else {
      this._ref.close(this.dynamicForm?.value);
    }
  }


}
