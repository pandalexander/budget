import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CalculatorComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-budget';

  showCalculator = true;
  showResults = false;

  handleFormSubmission(money: number) {
    console.log(money);
    this.showCalculator = false;
    this.showResults = true;
  }

  goBackToForm() {
    this.showCalculator = true;
    this.showResults = false;
  }
}
