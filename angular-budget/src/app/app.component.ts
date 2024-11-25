import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CalculatorComponent } from './calculator/calculator.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-budget';
}
