import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  imports: [ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  maxChildren: number = 10;

  childrenOptions = new Array(this.maxChildren).fill(0).map((_, i) => i + 1);

  infoForm = new FormGroup({
    numOfChildren: new FormControl('1'),
  });

  get numOfChildren() {
    return this.infoForm.get('numOfChildren')!.value;
  }

  onSubmit() {
    console.log(this.infoForm.value);
  }
}
