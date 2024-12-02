import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent {
  @Input() payload: any = {};

  get numberOfChildren(): number {
    return this.payload.numberOfChildren;
  }

  get agesOfChildren() {
    return this.payload.agesOfChildren;
  }

  get percentageOfFunding(): number {
    return this.payload.percentageOfFunding;
  }

  get collegeCost(): number {
    return this.payload.collegeCost;
  }

  get collegeTime(): number {
    return this.payload.collegeTime;
  }

  get currentSavings(): number {
    return this.payload.currentSavings;
  }

  get rateOfReturn(): number {
    return this.payload.rateOfReturn;
  }

  get annualCollegeCostInflation(): number {
    return this.payload.annualCollegeCostInflation;
  }

  numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  get totalSavingsGoal(): string {
    let totalCost = 0;

    for (let i = 0; i < this.numberOfChildren; i++) {
      let age = this.agesOfChildren[i];
      let T = 18 - age;
      const futureAnnualCost =
        this.collegeCost * (1 + this.annualCollegeCostInflation) ** T;

      const savingsGoal =
        futureAnnualCost * this.collegeTime * (this.percentageOfFunding / 100);

      totalCost += savingsGoal;
    }

    let roundedCost = totalCost.toFixed(0);

    return this.numberWithCommas(roundedCost);
  }
}
