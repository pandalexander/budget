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

  showWarning = true;

  handleWarningDismiss() {
    this.showWarning = false;
  }

  showCalculator = true;

  payloadToResult = {
    numberOfChildren: 0,
    agesOfChildren: [1],
    percentageOfFunding: 0,
    collegeCost: 0,
    collegeTime: 0,
    currentSavings: 0,
    rateOfReturn: 0,
    annualCollegeCostInflation: 0,
  };

  handleFormSubmission(result: any) {
    this.payloadToResult = result;
    console.log(this.payloadToResult);
    this.showCalculator = false;
  }

  goBackToForm() {
    this.showCalculator = true;
    this.payloadToResult = {
      numberOfChildren: 0,
      agesOfChildren: [1],
      percentageOfFunding: 0,
      collegeCost: 0,
      collegeTime: 0,
      currentSavings: 0,
      rateOfReturn: 0,
      annualCollegeCostInflation: 0,
    };
  }
}
