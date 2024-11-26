import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent implements OnInit {
  currentYear = new Date().getFullYear();

  numOfChildren = new FormControl(1);
  foo() {
    console.log(this.numOfChildren.value);
  }

  form!: FormGroup;
  numberOptions = [0, 1, 2, 3, 4, 5]; // Dropdown options for number of children

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Initialize the form
    this.form = this.fb.group({
      numChildren: [0], // Initial dropdown value
      birthYears: this.fb.array([]), // Dynamic fields for birth years
    });

    // Listen for changes to the number of children
    this.form.get('numChildren')?.valueChanges.subscribe((num: number) => {
      this.updateBirthYearFields(num);
    });
  }

  // Getter for birthYears FormArray
  get birthYears(): FormArray {
    return this.form.get('birthYears') as FormArray;
  }

  // Update the FormArray based on the selected number of children
  private updateBirthYearFields(num: number) {
    const currentCount = this.birthYears.length;

    if (num > currentCount) {
      // Add controls if more children are selected
      for (let i = currentCount; i < num; i++) {
        this.birthYears.push(this.fb.group({ year: [''] }));
      }
    } else if (num < currentCount) {
      // Remove controls if fewer children are selected
      for (let i = currentCount - 1; i >= num; i--) {
        this.birthYears.removeAt(i);
      }
    }
  }

  // Handle form submission
  onSubmit() {
    if (this.form.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
  }
}
