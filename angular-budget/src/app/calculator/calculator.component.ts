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
    'private 4-year',
    'private 2-year',
    'public 4-year in-state',
    'public 4-year out-of-state',
  ];

  infoForm = this.formBuilder.group({
    numOfChildren: ['1'],

    ages: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required]),
    ]),

    percentage: [100],

    collegeSelection: ['private 4-year'],

    moneySaved: [0],
  });

  get numOfChildren() {
    return this.infoForm.get('numOfChildren')!.value;
  }

  get ages() {
    return this.infoForm.get('ages') as FormArray;
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
