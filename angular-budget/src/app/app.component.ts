import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { NgClass } from '@angular/common';
import { ResultsComponent } from './results/results.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CalculatorComponent, NgClass, ResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-budget';

  showCalculator = false;

  handleFormSubmission(money: number) {
    console.log(money);
    this.showCalculator = false;
  }

  goBackToForm() {
    this.showCalculator = true;
  }
}
