import { Component, inject } from '@angular/core';
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
    'private 2-year',
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
      0,
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
    this.ages.push(this.formBuilder.control('', [Validators.required]));
  }

  onSubmit() {
    if (this.infoForm.valid) {
      console.log(this.infoForm.value);
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
}
