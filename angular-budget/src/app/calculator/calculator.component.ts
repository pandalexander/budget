import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

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

  infoForm = this.formBuilder.group({
    numOfChildren: ['1'],

    ages: this.formBuilder.array([this.formBuilder.control('')]),
  });

  get numOfChildren() {
    return this.infoForm.get('numOfChildren')!.value;
  }

  get ages() {
    return this.infoForm.get('ages') as FormArray;
  }

  addAge() {
    this.ages.push(this.formBuilder.control(''));
  }

  onSubmit() {
    console.log(this.infoForm.value);
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
