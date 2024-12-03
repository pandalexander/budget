import { Component, inject, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-calculator',
  imports: [ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  private formBuilder = inject(FormBuilder);

  maxChildren: number = 10;

  childrenOptions = new Array(this.maxChildren).fill(0).map((_, i) => i + 1);

  collegeTypes = [
    'public 4-year out-of-state',
    'public 4-year in-state',
    'public 2-year',
    'private 4-year',
  ];

  infoForm = this.formBuilder.group({
    numOfChildren: ['1'],

    ages: this.formBuilder.array([
      this.formBuilder.control('', [
        Validators.required,
        Validators.min(0),
        Validators.max(17),
      ]),
    ]),

    percentage: [
      100,
      Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
    ],

    collegeSelection: ['public 4-year out-of-state'],

    moneySaved: [
      ,
      Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(6000000),
      ]),
    ],
  });

  get numOfChildren() {
    return this.infoForm.get('numOfChildren')!.value;
  }

  get ages() {
    return this.infoForm.get('ages') as FormArray;
  }

  get percentage() {
    return this.infoForm.get('percentage')!;
  }

  get moneySaved() {
    return this.infoForm.get('moneySaved')!;
  }

  addAge() {
    this.ages.push(
      this.formBuilder.control('', [
        Validators.required,
        Validators.min(0),
        Validators.max(17),
      ])
    );
  }

  fourYearOutOfStateAnnual = 45240;
  fourYearInStateAnnual = 27940;
  twoYearAnnual = 19239;
  fourYearPrivate = 57570;

  onSubmit() {
    const thisForm = this.infoForm.value;
    let annualCollegeCost = 0;
    let currentCollegeTime = 0;

    switch (thisForm.collegeSelection) {
      case 'public 4-year out-of-state':
        annualCollegeCost = this.fourYearOutOfStateAnnual;
        currentCollegeTime = 4;
        break;

      case 'public 4-year in-state':
        annualCollegeCost = this.fourYearInStateAnnual;
        currentCollegeTime = 4;
        break;

      case 'public 2-year':
        annualCollegeCost = this.twoYearAnnual;
        currentCollegeTime = 2;
        break;

      case 'private 4-year':
        annualCollegeCost = this.fourYearPrivate;
        currentCollegeTime = 4;
        break;
    }

    const formToSubmit = {
      numberOfChildren: +thisForm.numOfChildren!,
      agesOfChildren: thisForm.ages!,
      percentageOfFunding: thisForm.percentage,
      collegeCost: annualCollegeCost,
      collegeTime: currentCollegeTime,
      currentSavings: thisForm.moneySaved,
      rateOfReturn: 0.05,
      annualCollegeCostInflation: 0.03,
    };

    if (this.infoForm.valid) {
      // console.log(this.infoForm.value);
      this.formSubmitted.emit(formToSubmit);
    } else {
      this.infoForm.markAsTouched;
      console.log('TRY AGAIN');
    }
  }

  onChildrenChange() {
    const newAmount = +this.numOfChildren!;

    if (newAmount === this.ages.length) {
      return;
    } else if (newAmount < this.ages.length) {
      for (let i = this.ages.length; i >= newAmount; i--) {
        this.ages.removeAt(i);
      }
    } else if (newAmount > this.ages.length)
      for (let i = this.ages.length; i < newAmount; i++) {
        this.addAge();
      }
  }

  @Output() formSubmitted = new EventEmitter<any>();
}
